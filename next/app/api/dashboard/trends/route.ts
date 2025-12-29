import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";


export const dynamic = 'force-dynamic';
import { subDays, startOfDay, format } from "date-fns";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const projectId = searchParams.get("projectId");

  try {
    const now = new Date();
    const thirtyDaysAgo = subDays(now, 29);

    const whereClause = projectId ? { projectId } : {};

    const incidents = await prisma.incident.findMany({
      where: {
        ...whereClause,
        createdAt: {
          gte: startOfDay(thirtyDaysAgo),
        },
      },
      select: {
        createdAt: true,
        severity: true,
      },
    });

    const dailyCounts: Record<string, { all: number; critical: number; warning: number; info: number }> = {};

    // Initialize last 30 days
    for (let i = 0; i < 30; i++) {
      const date = format(subDays(now, i), "yyyy-MM-dd");
      dailyCounts[date] = { all: 0, critical: 0, warning: 0, info: 0 };
    }

    incidents.forEach(inc => {
      const date = format(inc.createdAt, "yyyy-MM-dd");
      if (dailyCounts[date]) {
        dailyCounts[date].all++;
        const sev = inc.severity.toLowerCase();
        if (sev === 'critical') dailyCounts[date].critical++;
        else if (sev === 'warning') dailyCounts[date].warning++;
        else dailyCounts[date].info++;
      }
    });

    const trends = Object.entries(dailyCounts)
      .map(([date, counts]) => ({
        date,
        count: counts.all,
        critical: counts.critical,
        warning: counts.warning,
        info: counts.info
      }))
      .sort((a, b) => a.date.localeCompare(b.date));

    return NextResponse.json(trends);
  } catch (error) {
    console.error("Failed to fetch trends:", error);
    return NextResponse.json({ error: "Failed to fetch trends" }, { status: 500 });
  }
}
