import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        // 1. Fetch incident with project data using raw SQL
        const incidents: any[] = await prisma.$queryRaw`
            SELECT i.*, p."organizationId" 
            FROM "Incident" i 
            JOIN "Project" p ON i."projectId" = p.id 
            WHERE i.id = ${id}
        `;
        const incident = incidents[0];

        if (!incident) {
            return NextResponse.json({ error: "Incident not found" }, { status: 404 });
        }

        // 2. Update incident status
        await prisma.$executeRaw`
            UPDATE "Incident" SET status = 'RESOLVED', "updatedAt" = NOW() WHERE id = ${id}
        `;

        // 3. Create Audit Log
        const users: any[] = await prisma.$queryRaw`
            SELECT id, email FROM "User" WHERE "organizationId" = ${incident.organizationId} LIMIT 1
        `;
        const user = users[0];

        if (user) {
            const issueTitle = incident.aiDiagnosis && typeof incident.aiDiagnosis === 'object'
                ? (incident.aiDiagnosis as any).issue
                : 'No title';

            await prisma.$executeRaw`
                INSERT INTO "AuditLog" (id, action, details, "userId", "organizationId", "projectId", "incidentId", "createdAt")
                VALUES (gen_random_uuid(), 'RESOLVE_INCIDENT', ${`Resolved Incident #${incident.incidentId}: ${issueTitle}`}, ${user.id}, ${incident.organizationId}, ${incident.projectId}, ${incident.id}, NOW())
            `;
        }

        return NextResponse.json({ success: true, id: incident.id });
    } catch (error: any) {
        console.error("Failed to resolve incident:", error);
        return NextResponse.json({ error: "Failed to resolve incident", message: error.message }, { status: 500 });
    }
}
