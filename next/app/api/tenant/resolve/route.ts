import { prisma } from "@/lib/prisma";
import { NextResponse } from 'next/server';



export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const clerkOrgId = searchParams.get('clerkOrgId');

    if (!clerkOrgId) {
        return NextResponse.json({ error: 'Missing clerkOrgId' }, { status: 400 });
    }

    try {
        // 1. Try to find in our DB first
        const organization = await prisma.organization.findUnique({
            where: { clerkId: clerkOrgId },
            select: { id: true },
        });

        if (organization) {
            return NextResponse.json({ organizationId: organization.id });
        }

        // 2. If not found, fetch from Clerk API (Lazily create)
        console.log(`Organization ${clerkOrgId} not found in DB. Attempting lazy creation...`);

        try {
            // Dynamically import to avoid edge runtime issues if applicable, 
            // though this is a standard Node.js route.
            const { clerkClient } = await import('@clerk/nextjs/server');
            const client = await clerkClient();

            const clerkOrg = await client.organizations.getOrganization({ organizationId: clerkOrgId });

            if (!clerkOrg) {
                return NextResponse.json({ error: 'Organization not found in Clerk' }, { status: 404 });
            }

            // 3. Create in IDB
            const newOrg = await prisma.organization.create({
                data: {
                    clerkId: clerkOrg.id,
                    name: clerkOrg.name,
                    slug: clerkOrg.slug || `org-${clerkOrg.id}`,
                    isPersonal: false,
                }
            });

            console.log(`Lazily created organization: ${newOrg.id}`);
            return NextResponse.json({ organizationId: newOrg.id });

        } catch (clerkError) {
            console.error('Failed to fetch/create from Clerk:', clerkError);
            return NextResponse.json({ error: 'Failed to verify organization with Clerk' }, { status: 500 });
        }

    } catch (error) {
        console.error('Error resolving organization:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
