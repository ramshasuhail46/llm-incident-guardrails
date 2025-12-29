import { prisma } from "@/lib/prisma";
import { NextResponse } from 'next/server';
import { auth, currentUser } from '@clerk/nextjs/server';
import { PrismaClient } from '@prisma/client';


export const dynamic = 'force-dynamic';

// This API route creates a user and personal org on-demand if they don't exist
export async function POST() {
    try {
        const authData = await auth();
        const userId = authData.userId;
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const clerkUser = await currentUser();
        if (!clerkUser) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { clerkId: userId },
        });

        if (existingUser) {
            const org = await prisma.organization.findUnique({
                where: { id: existingUser.organizationId },
            });

            return NextResponse.json({
                user: existingUser,
                organization: org,
                message: 'User already exists',
            });
        }

        // Create user and personal org in transaction
        const result = await prisma.$transaction(async (tx) => {
            // Create personal organization
            const org = await tx.organization.create({
                data: {
                    name: `${clerkUser.firstName || 'User'}'s Workspace`,
                    slug: `user-${userId}`,
                    isPersonal: true,
                    clerkId: null,
                },
            });

            // Create user
            const user = await tx.user.create({
                data: {
                    clerkId: userId,
                    email: clerkUser.emailAddresses[0]?.emailAddress || '',
                    organizationId: org.id,
                    role: 'OWNER',
                },
            });

            return { user, organization: org };
        });

        return NextResponse.json({
            ...result,
            message: 'User and organization created successfully',
        });
    } catch (error) {
        console.error('Error in initialize-user:', error);
        return NextResponse.json(
            { error: 'Failed to initialize user' },
            { status: 500 }
        );
    }
}
