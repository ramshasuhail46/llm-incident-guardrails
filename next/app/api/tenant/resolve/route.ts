import { prisma } from "@/lib/prisma";
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';


export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const clerkOrgId = searchParams.get('clerkOrgId');

    if (!clerkOrgId) {
        return NextResponse.json({ error: 'Missing clerkOrgId' }, { status: 400 });
    }

    try {
        const organization = await prisma.organization.findUnique({
            where: { clerkId: clerkOrgId },
            select: { id: true },
        });

        if (!organization) {
            return NextResponse.json({ error: 'Organization not found' }, { status: 404 });
        }

        return NextResponse.json({ organizationId: organization.id });
    } catch (error) {
        console.error('Error resolving organization:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
