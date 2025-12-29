import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";


export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const isDemo = searchParams.get('demo') === 'true';

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
