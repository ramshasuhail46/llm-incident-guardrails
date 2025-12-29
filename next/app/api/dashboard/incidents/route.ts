import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";


export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const mockIncidents = [
      { id: "1", incidentId: "INC-8821", title: "Redis Connection Timeout", status: "OPEN", time: new Date(Date.now() - 1000 * 60 * 2).toISOString(), createdAt: new Date(Date.now() - 1000 * 60 * 2).toISOString(), projectName: "Inara" },
      { id: "2", incidentId: "INC-8820", title: "Memory Leak in Auth Service", status: "IN_PROGRESS", time: new Date(Date.now() - 1000 * 60 * 15).toISOString(), createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(), projectName: "Inara" },
      { id: "3", incidentId: "INC-8819", title: "API Latency Spike (Europe)", status: "RESOLVED", time: new Date(Date.now() - 1000 * 60 * 45).toISOString(), createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(), projectName: "Inara" },
      { id: "4", incidentId: "INC-8818", title: "Database Replication Lag", status: "OPEN", time: new Date(Date.now() - 1000 * 60 * 120).toISOString(), createdAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(), projectName: "Serenity" },
      { id: "5", incidentId: "INC-8817", title: "Kafka Consumer rebalancing", status: "RESOLVED", time: new Date(Date.now() - 1000 * 60 * 240).toISOString(), createdAt: new Date(Date.now() - 1000 * 60 * 240).toISOString(), projectName: "Firefly" },
      { id: "6", incidentId: "INC-8816", title: "S3 Bucket Access Denied", status: "IN_PROGRESS", time: new Date(Date.now() - 1000 * 60 * 480).toISOString(), createdAt: new Date(Date.now() - 1000 * 60 * 480).toISOString(), projectName: "Inara" },
      { id: "7", incidentId: "INC-8815", title: "Zookeeper cluster instability", status: "RESOLVED", time: new Date(Date.now() - 1000 * 60 * 600).toISOString(), createdAt: new Date(Date.now() - 1000 * 60 * 600).toISOString(), projectName: "Nebula" },
      { id: "8", incidentId: "INC-8814", title: "Rate limiting triggered in API GW", status: "RESOLVED", time: new Date(Date.now() - 1000 * 60 * 720).toISOString(), createdAt: new Date(Date.now() - 1000 * 60 * 720).toISOString(), projectName: "Inara" },
      { id: "9", incidentId: "INC-8813", title: "Elasticsearch Indexing Failure", status: "OPEN", time: new Date(Date.now() - 1000 * 60 * 1440).toISOString(), createdAt: new Date(Date.now() - 1000 * 60 * 1440).toISOString(), projectName: "LogStream" },
      { id: "10", incidentId: "INC-8812", title: "Internal Server Error (500) on /login", status: "RESOLVED", time: new Date(Date.now() - 1000 * 60 * 2880).toISOString(), createdAt: new Date(Date.now() - 1000 * 60 * 2880).toISOString(), projectName: "Inara" },
    ];

    return NextResponse.json(mockIncidents);
  } catch (error) {
    console.error("Failed to fetch incidents:", error);
    return NextResponse.json({ error: "Failed to fetch incidents" }, { status: 500 });
  }
}
