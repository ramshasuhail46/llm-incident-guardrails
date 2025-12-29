import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const incidents = await prisma.incident.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 8,
      include: {
        project: true,
      },
    });

    const formattedIncidents = incidents.map((inc) => ({
      id: inc.id,
      incidentId: inc.incidentId,
      title: inc.aiDiagnosis && typeof inc.aiDiagnosis === 'object' && (inc.aiDiagnosis as any).issue
        ? (inc.aiDiagnosis as any).issue
        : `Incident ${inc.incidentId}`,
      status: inc.status,
      time: inc.createdAt,
      projectName: inc.project?.name || "Unknown",
    }));

    return NextResponse.json(formattedIncidents);
  } catch (error) {
    console.error("Failed to fetch incidents:", error);
    return NextResponse.json({ error: "Failed to fetch incidents" }, { status: 500 });
  }
}
