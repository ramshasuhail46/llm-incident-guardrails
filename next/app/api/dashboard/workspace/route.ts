import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        // Falling back to raw SQL because Prisma client in Next.js runtime is stale and doesn't see 'slug'
        const rawOrgs = await prisma.$queryRaw<any[]>`SELECT * FROM "Organization" ORDER BY name ASC`;
        const rawProjects = await prisma.$queryRaw<any[]>`SELECT * FROM "Project"`;

        const orgs = rawOrgs.map(org => ({
            ...org,
            projects: rawProjects.filter(p => p.organizationId === org.id)
        }));

        return NextResponse.json(orgs);
    } catch (error) {
        console.error("Fetch workspace data error:", error);
        return NextResponse.json({ error: "Failed to fetch workspace data" }, { status: 500 });
    }
}
