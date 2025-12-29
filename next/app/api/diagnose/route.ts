import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import redis from '@/shared/redis';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { signals } = body;

        if (!signals) {
            return NextResponse.json({ error: 'Signals data is required' }, { status: 400 });
        }

        const taskId = uuidv4();
        const queueName = process.env.CELERY_QUEUE_NAME || 'sre_incidents';
        const taskName = 'diagnose_incident_task';

        // Celery task message structure
        // Celery expects body format: [args, kwargs, embed]
        // where args is a list of positional arguments
        // kwargs is a dict of keyword arguments
        // embed is a dict with callbacks/errbacks
        const celeryBody = [
            [signals],  // args - list of positional arguments
            {},         // kwargs - empty dict (no keyword arguments)
            {}          // embed - empty dict (no callbacks)
        ];
        
        const taskMessage = {
            headers: {
                id: taskId,
                task: taskName,
            },
            body: Buffer.from(JSON.stringify(celeryBody)).toString('base64'),
            'content-encoding': 'utf-8',
            'content-type': 'application/json',
            properties: {
                body_encoding: 'base64',
                delivery_tag: uuidv4(),
                delivery_info: {
                    exchange: '',
                    routing_key: queueName,
                },
                priority: 0,
                reply_to: taskId,
            },
        };

        // Push to the Redis list (queue)
        await redis.lpush(queueName, JSON.stringify(taskMessage));

        return NextResponse.json({ taskId });
    } catch (error) {
        console.error('Failed to submit diagnosis task:', error);
        return NextResponse.json({ error: 'Failed to submit diagnosis task' }, { status: 500 });
    }
}
