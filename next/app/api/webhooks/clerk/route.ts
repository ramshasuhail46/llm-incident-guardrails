import { prisma } from "@/lib/prisma";
import { headers } from 'next/headers';
import { Webhook } from 'svix';
import { WebhookEvent } from '@clerk/nextjs/server';


export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
    // Get the headers - await for Next.js 15+
    const headerPayload = await headers();
    const svix_id = headerPayload.get('svix-id');
    const svix_timestamp = headerPayload.get('svix-timestamp');
    const svix_signature = headerPayload.get('svix-signature');

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response('Error occured -- no svix headers', {
            status: 400,
        });
    }

    // Get the body
    const payload = await req.json();
    const body = JSON.stringify(payload);

    // Create a new Svix instance with your webhook secret
    const wh = new Webhook(process.env.WEBHOOK_SECRET || '');

    let evt: WebhookEvent;

    // Verify the payload with the headers
    try {
        evt = wh.verify(body, {
            'svix-id': svix_id,
            'svix-timestamp': svix_timestamp,
            'svix-signature': svix_signature,
        }) as WebhookEvent;
    } catch (err) {
        console.error('Error verifying webhook:', err);
        return new Response('Error occured', {
            status: 400,
        });
    }

    // Handle the webhook
    const eventType = evt.type;

    if (eventType === 'user.created') {
        const { id, email_addresses, first_name, last_name } = evt.data;
        const email = email_addresses[0]?.email_address;

        if (!email) {
            return new Response('No email found', { status: 400 });
        }

        try {
            // Use transaction to ensure atomicity
            await prisma.$transaction(async (tx) => {
                // Check if user already exists (idempotency)
                const existingUser = await tx.user.findUnique({
                    where: { clerkId: id },
                });

                if (existingUser) {
                    console.log('User already exists:', id);
                    return;
                }

                // Create personal organization first
                // We ALWAYS append the last 4 characters of the ID to guarantee uniqueness 
                // in the database across all environments.
                const uniqueName = `${first_name || 'User'}'s Workspace (${id.slice(-4)})`;

                const personalOrg = await tx.organization.create({
                    data: {
                        name: uniqueName,
                        slug: `user-${id}`,
                        isPersonal: true,
                        clerkId: null, // Personal orgs don't have Clerk IDs
                    },
                });

                // Create user linked to personal org
                await tx.user.create({
                    data: {
                        clerkId: id,
                        email: email,
                        organizationId: personalOrg.id,
                        role: 'OWNER',
                    },
                });

                console.log('User and personal org created:', id, uniqueName);
            });

            return new Response('User created successfully', { status: 200 });
        } catch (error: any) {
            console.error('Error creating user:', error);
            // Return the actual error message so we can see it in the Clerk Dashboard
            return new Response(`Error creating user: ${error.message || 'Unknown error'}`, { status: 500 });
        }
    }

    if (eventType === 'organization.created') {
        const { id, name, slug } = evt.data;

        try {
            await prisma.$transaction(async (tx) => {
                // Check if organization already exists (idempotency)
                const existingOrg = await tx.organization.findUnique({
                    where: { clerkId: id },
                });

                if (existingOrg) {
                    console.log('Organization already exists:', id);
                    return;
                }

                // Create team organization
                await tx.organization.create({
                    data: {
                        clerkId: id,
                        name: name,
                        slug: slug || `org-${id}`,
                        isPersonal: false,
                    },
                });

                console.log('Organization created:', id);
            });

            return new Response('Organization created successfully', { status: 200 });
        } catch (error) {
            console.error('Error creating organization:', error);
            return new Response('Error creating organization', { status: 500 });
        }
    }

    if (eventType === 'organizationMembership.created') {
        const { organization, public_user_data } = evt.data;
        const userId = public_user_data?.user_id;
        const orgId = organization?.id;

        if (!userId || !orgId) {
            return new Response('Missing user or organization ID', { status: 400 });
        }

        try {
            await prisma.$transaction(async (tx) => {
                // Find the user and organization
                const user = await tx.user.findUnique({
                    where: { clerkId: userId },
                });

                const org = await tx.organization.findUnique({
                    where: { clerkId: orgId },
                });

                if (!user || !org) {
                    console.error('User or organization not found');
                    return;
                }

                // Update user's organization (this creates the membership)
                await tx.user.update({
                    where: { id: user.id },
                    data: {
                        organizationId: org.id,
                    },
                });

                console.log('Organization membership created:', userId, orgId);
            });

            return new Response('Membership created successfully', { status: 200 });
        } catch (error) {
            console.error('Error creating membership:', error);
            return new Response('Error creating membership', { status: 500 });
        }
    }

    if (eventType === 'user.deleted') {
        const { id } = evt.data;
        try {
            // Find user to get their personal org
            const user = await prisma.user.findUnique({
                where: { clerkId: id },
                include: { organization: true }
            });

            if (user) {
                await prisma.$transaction(async (tx) => {
                    // Delete user first
                    await tx.user.delete({
                        where: { id: user.id }
                    });

                    // If it was a personal org, delete it too
                    if (user.organization.isPersonal) {
                        await tx.organization.delete({
                            where: { id: user.organization.id }
                        });
                    }
                });
                console.log('User and personal org deleted:', id);
            }
            return new Response('User deleted successfully', { status: 200 });
        } catch (error) {
            console.error('Error deleting user:', error);
            return new Response('Error deleting user', { status: 500 });
        }
    }

    if (eventType === 'organization.deleted') {
        const { id } = evt.data;
        try {
            await prisma.organization.delete({
                where: { clerkId: id }
            });
            console.log('Organization deleted:', id);
            return new Response('Organization deleted successfully', { status: 200 });
        } catch (error) {
            console.error('Error deleting organization:', error);
            return new Response('Error deleting organization', { status: 500 });
        }
    }

    if (eventType === 'organizationMembership.deleted') {
        const { public_user_data } = evt.data;
        const userId = public_user_data?.user_id;

        if (!userId) {
            return new Response('Missing user ID', { status: 400 });
        }

        try {
            // Revert to personal workspace if possible, or just remove org reference
            // For now, we'll just log it as it depends on business logic for default workspace
            console.log('Organization membership deleted for user:', userId);
            return new Response('Membership deleted logged', { status: 200 });
        } catch (error) {
            console.error('Error handling membership deletion:', error);
            return new Response('Error handled', { status: 200 });
        }
    }

    return new Response('Webhook received', { status: 200 });
}
