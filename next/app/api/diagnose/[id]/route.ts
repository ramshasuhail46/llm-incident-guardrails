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
