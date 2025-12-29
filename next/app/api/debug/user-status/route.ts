import { prisma } from "@/lib/prisma";
import { NextResponse } from 'next/server';
import { auth, currentUser } from '@clerk/nextjs/server';
import { PrismaClient } from '@prisma/client';


export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const authData = await auth();
        const userId = authData.userId;

        if (!userId) {
            return NextResponse.json({
                authenticated: false,
                error: 'Not authenticated'
            });
        }

        const clerkUser = await currentUser();

        // Check if user exists in database
        const dbUser = await prisma.user.findUnique({
            where: { clerkId: userId },
            include: {
                organization: true,
            },
        });

        return NextResponse.json({
            authenticated: true,
            clerk: {
                userId,
                email: clerkUser?.emailAddresses[0]?.emailAddress,
                firstName: clerkUser?.firstName,
            },
            database: {
                userExists: !!dbUser,
                user: dbUser,
            },
        });
    } catch (error: any) {
        return NextResponse.json({
            error: error.message,
            details: error.toString(),
        }, { status: 500 });
    }
}
