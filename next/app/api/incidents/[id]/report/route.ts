import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        // Fetch incident with project name using raw SQL
        const incidents: any[] = await prisma.$queryRaw`
            SELECT i.*, p.name as "projectName" 
            FROM "Incident" i 
            JOIN "Project" p ON i."projectId" = p.id 
            WHERE i.id = ${id}
        `;

        const incident = incidents[0];

        if (!incident) {
            return NextResponse.json({ error: "Incident not found" }, { status: 404 });
        }

        // Fetch all audit logs for this incident with user emails
        const auditLogs: any[] = await prisma.$queryRaw`
            SELECT al.*, u.email as "userEmail" 
            FROM "AuditLog" al 
            JOIN "User" u ON al."userId" = u.id 
            WHERE al."incidentId" = ${id}
            ORDER BY al."createdAt" ASC
        `;

        // Format to match expected UI structure
        const report = {
            ...incident,
            project: { name: incident.projectName },
            auditLogs: auditLogs.map(al => ({
                ...al,
                user: { email: al.userEmail }
            }))
        };

        return NextResponse.json(report);
    } catch (error: any) {
        console.error("Fetch incident report error:", error);
        return NextResponse.json({
            error: "Failed to fetch incident report",
            message: error.message
        }, { status: 500 });
    }
}
