import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';


export const dynamic = 'force-dynamic';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id: projectId } = await params;

        const settings = await prisma.projectSettings.findUnique({
            where: { projectId },
        });

        // Return default settings if none exist
        if (!settings) {
            return NextResponse.json({
                autoRestartEnabled: false,
                scaleUpEnabled: false,
                flushCacheEnabled: false,
                dryRunMode: true,
                minConfidenceScore: 0.8,
                maxActionsPerDay: 10,
                maintenanceWindowStart: null,
                maintenanceWindowEnd: null,
                requireHumanApproval: true,
                notificationChannels: null,
            });
        }

        return NextResponse.json(settings);
    } catch (error) {
        console.error('Error fetching guardrails settings:', error);
        return NextResponse.json(
            { error: 'Failed to fetch settings' },
            { status: 500 }
        );
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id: projectId } = await params;
        const body = await request.json();

        const settings = await prisma.projectSettings.upsert({
            where: { projectId },
            update: {
                autoRestartEnabled: body.autoRestartEnabled,
                scaleUpEnabled: body.scaleUpEnabled,
                flushCacheEnabled: body.flushCacheEnabled,
                dryRunMode: body.dryRunMode,
                minConfidenceScore: parseFloat(body.minConfidenceScore),
                maxActionsPerDay: parseInt(body.maxActionsPerDay),
                maintenanceWindowStart: body.maintenanceWindowStart,
                maintenanceWindowEnd: body.maintenanceWindowEnd,
                requireHumanApproval: body.requireHumanApproval,
                notificationChannels: body.notificationChannels,
            },
            create: {
                projectId,
                autoRestartEnabled: body.autoRestartEnabled,
                scaleUpEnabled: body.scaleUpEnabled,
                flushCacheEnabled: body.flushCacheEnabled,
                dryRunMode: body.dryRunMode,
                minConfidenceScore: parseFloat(body.minConfidenceScore),
                maxActionsPerDay: parseInt(body.maxActionsPerDay),
                maintenanceWindowStart: body.maintenanceWindowStart,
                maintenanceWindowEnd: body.maintenanceWindowEnd,
                requireHumanApproval: body.requireHumanApproval,
                notificationChannels: body.notificationChannels,
            },
        });

        return NextResponse.json(settings);
    } catch (error) {
        console.error('Error updating guardrails settings:', error);
        return NextResponse.json(
            { error: 'Failed to update settings' },
            { status: 500 }
        );
    }
}
