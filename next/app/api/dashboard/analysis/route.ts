import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";


export const dynamic = 'force-dynamic';
import { Prisma } from "@prisma/client";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const projectId = searchParams.get("projectId");

  try {
    const whereClause = projectId ? { projectId } : {};

    const [severityGroup, resolvedIncidents, aiStats] = await Promise.all([
      // 1. Severity Distribution
      prisma.incident.groupBy({
        by: ['severity'],
        where: whereClause,
        _count: {
          severity: true,
        },
      }),
      // 2. MTTR (only resolved incidents)
      prisma.incident.findMany({
        where: {
          ...whereClause,
          status: "RESOLVED",
        },
        select: {
          createdAt: true,
          updatedAt: true,
        },
      }),
      // 3. Top AI Issues
      prisma.incident.findMany({
        where: {
          ...whereClause,
          aiDiagnosis: {
            not: Prisma.DbNull
          },
        },
        select: {
          aiDiagnosis: true,
        },
      }),
    ]);

    // Format Severity Distribution
    const severityDistribution = severityGroup.map((g) => ({
      name: g.severity,
      value: g._count.severity,
    }));

    // Calculate MTTR
    let mttrMinutes = 0;
    if (resolvedIncidents.length > 0) {
      const totalTimeMs = resolvedIncidents.reduce((sum, inc) => {
        return sum + (inc.updatedAt.getTime() - inc.createdAt.getTime());
      }, 0);
      mttrMinutes = Math.round((totalTimeMs / resolvedIncidents.length) / (1000 * 60));
    }

    // Process Top AI Issues
    const issueCounts: Record<string, number> = {};
    aiStats.forEach((inc) => {
      // @ts-ignore - Json type handling
      const issue = inc.aiDiagnosis?.issue || "Unknown Issue";
      issueCounts[issue] = (issueCounts[issue] || 0) + 1;
    });

    const topAiIssues = Object.entries(issueCounts)
      .map(([issue, count]) => ({
        issue: issue.length > 30 ? issue.substring(0, 30) + "..." : issue,
        count,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5); // Start with top 5

    return NextResponse.json({
      severityDistribution,
      mttr: mttrMinutes,
      topAiIssues,
    });
  } catch (error) {
    console.error("Failed to fetch analysis:", error);
    return NextResponse.json({ error: "Failed to fetch analysis" }, { status: 500 });
  }
}
