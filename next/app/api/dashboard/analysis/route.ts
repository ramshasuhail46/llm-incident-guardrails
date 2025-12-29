import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";


export const dynamic = 'force-dynamic';
import { Prisma } from "@prisma/client";

export async function GET(request: Request) {
  try {
    // Returning high-fidelity mock data for analysis widgets
    const severityDistribution = [
      { name: 'CRITICAL', value: 18 },
      { name: 'HIGH', value: 42 },
      { name: 'MEDIUM', value: 56 },
      { name: 'LOW', value: 26 },
    ];

    const topAiIssues = [
      { issue: "Redis Connection Timeouts", count: 42 },
      { issue: "Kubernetes Pod Evictions", count: 28 },
      { issue: "API Latency Spikes (Auth)", count: 24 },
      { issue: "Memory Leak in sso-service", count: 18 },
      { issue: "Zombie Processes in worker-pool", count: 12 },
    ];

    return NextResponse.json({
      severityDistribution,
      mttr: 14, // 14 minutes
      topAiIssues,
    });
  } catch (error) {
    console.error("Failed to fetch analysis:", error);
    return NextResponse.json({ error: "Failed to fetch analysis" }, { status: 500 });
  }
}
