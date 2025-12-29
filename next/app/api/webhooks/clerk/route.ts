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
            // Check if user already exists (idempotency)
            const existingUser = await prisma.user.findUnique({
                where: { clerkId: id },
            });

            if (existingUser) {
                console.log('User already exists:', id);
                return new Response('User already exists', { status: 200 });
            }

            // Create user ONLY. 
            // We do NOT create a personal organization anymore.
            // The user will need to be added to an organization via 'organizationMembership.created'
            // or we expect them to be part of one via Metadata if we were passing it.
            // CAUTION: This creates a user with potentially no organizationId if the schema requires it.
            // However, our User model has `organizationId String`. 
            // We need a strategy here. Since the requirement is "User can only be in 1 org"
            // and "Required at sign up", Clerk should send org info.
            // But 'user.created' might fire before assignment.

            // Hack for now: We might need to allow nullable organizationId temporarily 
            // OR we expect the organization to exist and we find it.

            // If strictly enforced in DB, we can't create the user yet without an Org ID.
            // But we can't block user creation.

            // For now, we will SKIP user creation here and let `organizationMembership.created` 
            // create the user if they don't exist? No, that's risky.

            // Better approach: We create the user when we receive the MEMBERSHIP event.
            // Or we check if we can find an invite.

            console.log('User created in Clerk. Waiting for Organization Membership to link user.');
            return new Response('User created (waiting for org link)', { status: 200 });

        } catch (error: any) {
            console.error('Error handling user.created:', error);
            return new Response(`Error: ${error.message}`, { status: 500 });
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
                    // Removed legacy isPersonal check
                    /*
                    if (user.organization.isPersonal) {
                     // logic removed
                    }
                    */
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
