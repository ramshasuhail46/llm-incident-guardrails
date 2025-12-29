import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
    request: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params;

        // Falling back to raw SQL because Prisma client in Next.js runtime is stale and doesn't see 'slug'
        const orgs = await prisma.$queryRaw<any[]>`SELECT id FROM "Organization" WHERE slug = ${slug}`;
        const orgId = orgs[0]?.id;

        if (!orgId) {
            return NextResponse.json({ error: "Organization not found" }, { status: 404 });
        }

        const org = await prisma.organization.findUnique({
            where: { id: orgId },
            include: {
                users: true,
            },
        });

        if (!org) {
            return NextResponse.json({ error: "Organization not found" }, { status: 404 });
        }

        return NextResponse.json(org.users);
    } catch (error: any) {
        console.error("Fetch members error:", error);
        return NextResponse.json({ error: "Failed to fetch members", message: error.message }, { status: 500 });
    }
}
