import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from 'next/server';
import redis from '@/shared/redis';

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        if (!id) {
            return NextResponse.json({ error: 'Task ID is required' }, { status: 400 });
        }

        if (id.startsWith('demo-task-')) {
            return NextResponse.json({
                status: 'SUCCESS',
                result: {
                    summary: "Demonstration: High CPU usage detected on API nodes due to inefficient serialization in the JSON handler. This is a common pattern observed during high-traffic events.",
                    hypotheses: [
                        {
                            rank: 1,
                            cause: "JSON Serialization Overhead",
                            confidence: 0.92,
                            evidence: ["CPU spikes correlating with API traffic", "High time spent in JSON.stringify"],
                            mitigation_strategy: "Implement a more efficient serialization library or cache common JSON responses."
                        },
                        {
                            rank: 2,
                            cause: "Memory Leak in Buffer Pool",
                            confidence: 0.45,
                            evidence: ["Gradual increase in memory usage", "Garbage collection clusters"],
                            mitigation_strategy: "Profile memory usage and ensure all buffers are correctly deallocated."
                        }
                    ]
                }
            });
        }

        const resultKey = `celery-task-meta-${id}`;
        const taskData = await redis.get(resultKey);

        if (!taskData) {
            return NextResponse.json({ status: 'PENDING' });
        }

        const result = JSON.parse(taskData);
        return NextResponse.json({
            status: result.status,
            result: result.result,
            traceback: result.traceback,
        });
    } catch (error) {
        console.error('Failed to poll diagnosis task:', error);
        return NextResponse.json({ error: 'Failed to poll diagnosis task' }, { status: 500 });
    }
}
