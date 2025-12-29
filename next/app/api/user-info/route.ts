import { prisma } from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Example: Get current user on the server side
export async function GET() {
    // Method 1: Get auth info (user ID, session ID, etc.)
    const { userId } = await auth();

    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Method 2: Get full user object
    const user = await currentUser();

    if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Return user information
    return NextResponse.json({
        userId: user.id,
        email: user.emailAddresses[0]?.emailAddress,
        fullName: `${user.firstName} ${user.lastName}`,
        imageUrl: user.imageUrl,
        createdAt: user.createdAt,
    });
}
