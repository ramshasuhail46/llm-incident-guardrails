import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';


// Force dynamic rendering to prevent build-time errors
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
    try {
        const { category, message, userId, organizationId, projectId } = await req.json();

        // Validation
        if (!category || !message) {
            return NextResponse.json(
                { error: 'Category and message are required' },
                { status: 400 }
            );
        }

        if (!['Bug', 'Feature Request', 'Billing', 'General'].includes(category)) {
            return NextResponse.json(
                { error: 'Invalid category' },
                { status: 400 }
            );
        }

        if (message.trim().length < 10) {
            return NextResponse.json(
                { error: 'Message must be at least 10 characters' },
                { status: 400 }
            );
        }

        // Save to database
        const feedback = await prisma.feedback.create({
            data: {
                category,
                message: message.trim(),
                userId: userId || null,
                organizationId: organizationId || null,
                projectId: projectId || null,
            },
        });

        return NextResponse.json({
            success: true,
            feedback: {
                id: feedback.id,
                category: feedback.category,
                createdAt: feedback.createdAt,
            }
        });
    } catch (error) {
        console.error('Error submitting feedback:', error);
        return NextResponse.json(
            { error: 'Failed to submit feedback' },
            { status: 500 }
        );
    }
}
