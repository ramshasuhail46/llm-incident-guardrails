import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import redis from '@/shared/redis';

// Define types for validation
interface ReportRequest {
    incident_id: string;
    signals: {
        metrics?: Record<string, any>;
        logs?: string[];
        deployments?: any[];
        infrastructure?: Record<string, any>;
        configuration?: Record<string, any>;
        dependencies?: Record<string, any>;
        [key: string]: any;
    };
}

export async function OPTIONS() {
    return new NextResponse(null, {
        status: 204,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
    });
}

export async function POST(req: NextRequest) {
    try {
        const body: ReportRequest = await req.json();
        const { incident_id, signals } = body;

        // Validation
        if (!incident_id || !signals) {
            return NextResponse.json(
                { error: 'Missing required fields: incident_id and signals' },
                {
                    status: 400,
                    headers: { 'Access-Control-Allow-Origin': '*' }
                }
            );
        }

        const taskId = uuidv4();
        const queueName = process.env.CELERY_QUEUE_NAME || 'sre_incidents';
        const taskName = 'diagnose_incident_task';

        // Celery expects body format: [args, kwargs, embed]
        const celeryBody = [
            [signals], // args
            {},        // kwargs
            {}         // embed
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

        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
        const resultsUrl = `${baseUrl}/reports/${taskId}`;

        return NextResponse.json(
            {
                task_id: taskId,
                results_url: resultsUrl,
                message: 'Incident report accepted for analysis'
            },
            {
                status: 202,
                headers: { 'Access-Control-Allow-Origin': '*' }
            }
        );
    } catch (error) {
        console.error('Public API Ingestion Error:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            {
                status: 500,
                headers: { 'Access-Control-Allow-Origin': '*' }
            }
        );
    }
}
