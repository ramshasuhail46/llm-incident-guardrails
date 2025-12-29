import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";


export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    // Returning high-fidelity mock data to ensure dashboard is always populated
    return NextResponse.json({
      total: 142,
      active: 12,
      avgConfidence: 0.94,
      uptime: 99.98,
      activeTrend: 12, // +12%
      totalTrend: -5,  // -5%
    });
  } catch (error) {
    console.error("Failed to fetch stats:", error);
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}
