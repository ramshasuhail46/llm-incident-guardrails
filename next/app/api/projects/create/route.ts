import { prisma } from "@/lib/prisma";
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';



export const dynamic = 'force-dynamic';

function generateSlug(name: string): string {
    return name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

function generateApiKey(): string {
    const randomString = Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);
    return `proj_${randomString}`;
}

export async function POST(request: Request) {
    try {
        const authData = await auth();
        const userId = authData.userId;

        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { name, organizationId } = body;

        if (!name || !organizationId) {
            return NextResponse.json(
                { error: 'Name and organization ID are required' },
                { status: 400 }
            );
        }

        const user = await prisma.user.findUnique({
            where: { clerkId: userId },
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // If the user's current organization in our DB doesn't match the requested one,
        // we update it on-the-fly. This handles org switching in the UI since our
        // current schema only stores the "active" organization for each user.
        if (user.organizationId !== organizationId) {
            await prisma.user.update({
                where: { id: user.id },
                data: { organizationId }
            });
        }

        // Create project
        const slug = generateSlug(name);
        const apiKey = generateApiKey();

        const project = await prisma.project.create({
            data: {
                name,
                slug,
                apiKey,
                organizationId,
            },
        });

        return NextResponse.json({
            project,
            message: 'Project created successfully',
        });
    } catch (error: any) {
        console.error('Error creating project:', error);

        // Handle unique constraint violations
        if (error.code === 'P2002') {
            return NextResponse.json(
                { error: 'A project with this name already exists in your organization' },
                { status: 409 }
            );
        }

        return NextResponse.json(
            { error: 'Failed to create project' },
            { status: 500 }
        );
    }
}
