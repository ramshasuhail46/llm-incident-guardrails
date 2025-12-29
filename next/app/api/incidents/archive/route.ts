import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const projectId = searchParams.get("projectId");
        const startDate = searchParams.get("startDate");
        const endDate = searchParams.get("endDate");
        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "20");
        const skip = (page - 1) * limit;

        const where: any = {
            status: { in: ["RESOLVED", "ARCHIVED"] },
        };

        if (projectId) {
            where.projectId = projectId;
        }

        if (startDate || endDate) {
            where.createdAt = {};
            if (startDate) where.createdAt.gte = new Date(startDate);
            if (endDate) where.createdAt.lte = new Date(endDate);
        }

        // Use raw SQL as a fallback if Prisma client is stale, 
        // but for now let's try standard Prisma since we're using well-established fields.
        // However, given previous experience with stale client, I'll be defensive.

        // Falling back to raw SQL because Prisma client in Next.js runtime is stale
        let query = `SELECT i.*, p.name as "projectName" FROM "Incident" i JOIN "Project" p ON i."projectId" = p.id WHERE i.status IN ('RESOLVED', 'ARCHIVED')`;
        const queryParams: any[] = [];

        if (projectId) {
            query += ` AND i."projectId" = $${queryParams.length + 1}`;
            queryParams.push(projectId);
        }

        if (startDate) {
            query += ` AND i."createdAt" >= $${queryParams.length + 1}`;
            queryParams.push(new Date(startDate));
        }

        if (endDate) {
            query += ` AND i."createdAt" <= $${queryParams.length + 1}`;
            queryParams.push(new Date(endDate));
        }

        query += ` ORDER BY i."createdAt" DESC LIMIT ${limit} OFFSET ${skip}`;

        const incidents: any[] = await prisma.$queryRawUnsafe(query, ...queryParams);

        // Fetch resolution logs for these incidents
        const incidentIds = incidents.map(i => i.id);
        const resolutionLogs: any[] = incidentIds.length > 0
            ? await prisma.$queryRawUnsafe(`
                SELECT al.*, u.email as "userEmail" 
                FROM "AuditLog" al 
                JOIN "User" u ON al."userId" = u.id 
                WHERE al."incidentId" IN (${incidentIds.map((_, i) => `$${i + 1}`).join(',')}) 
                AND al.action = 'RESOLVE_INCIDENT'
              `, ...incidentIds)
            : [];

        // Attach data to match expected format
        const formattedIncidents = incidents.map(i => ({
            ...i,
            project: { name: i.projectName },
            auditLogs: resolutionLogs
                .filter(al => al.incidentId === i.id)
                .map(al => ({ user: { email: al.userEmail } }))
        }));

        let countQuery = `SELECT COUNT(*) as count FROM "Incident" WHERE status IN ('RESOLVED', 'ARCHIVED')`;
        const countParams: any[] = [];
        if (projectId) {
            countQuery += ` AND "projectId" = $${countParams.length + 1}`;
            countParams.push(projectId);
        }
        if (startDate) {
            countQuery += ` AND "createdAt" >= $${countParams.length + 1}`;
            countParams.push(new Date(startDate));
        }
        if (endDate) {
            countQuery += ` AND "createdAt" <= $${countParams.length + 1}`;
            countParams.push(new Date(endDate));
        }

        const totalResults: any[] = await prisma.$queryRawUnsafe(countQuery, ...countParams);
        const total = Number(totalResults[0].count);

        return NextResponse.json({
            incidents: formattedIncidents,
            pagination: {
                total,
                pages: Math.ceil(total / limit),
                currentPage: page,
                limit
            }
        });
    } catch (error: any) {
        console.error("Fetch archive error:", error);
        return NextResponse.json({
            error: "Failed to fetch archive",
            message: error.message
        }, { status: 500 });
    }
}
