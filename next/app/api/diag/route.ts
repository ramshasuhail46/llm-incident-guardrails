import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        // 1. Check Connectivity
        await prisma.$connect();

        // 2. Check Table Access
        const userCount = await prisma.user.count();
        const orgCount = await prisma.organization.count();

        // 3. Return environment status (no secrets)
        return NextResponse.json({
            status: "online",
            database: "connected",
            tables: {
                users: userCount,
                organizations: orgCount
            },
            env_check: {
                has_db_url: !!process.env.DATABASE_URL,
                has_direct_url: !!process.env.DIRECT_URL,
                node_env: process.env.NODE_ENV
            }
        });
    } catch (err: any) {
        console.error("DIAGNOSTIC ERROR:", err);
        return NextResponse.json({
            status: "error",
            message: err.message,
            code: err.code,
            meta: err.meta,
            suggestion: err.message.includes("Can't reach database")
                ? "Check your DATABASE_URL and Supabase Pooler settings. Try adding ?pgbouncer=true to the URL."
                : "Check if all migrations were successful."
        }, { status: 500 });
    }
}
