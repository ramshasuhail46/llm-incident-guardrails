import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
    request: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params;

        // Falling back to raw SQL to get orgId by slug because Prisma client is stale
        const orgs = await prisma.$queryRaw<any[]>`SELECT id FROM \"Organization\" WHERE slug = ${slug}`;
        const orgId = orgs[0]?.id;

        const logs = await prisma.auditLog.findMany({
            where: {
                organizationId: orgId || ''
            },
            include: {
                user: true,
                project: true,
            },
            orderBy: {
                createdAt: "desc"
            }
        });

        return NextResponse.json(logs);
    } catch (error) {
        console.error("Fetch audit logs error:", error);
        return NextResponse.json({ error: "Failed to fetch audit logs" }, { status: 500 });
    }
}
