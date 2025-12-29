import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const project = await prisma.project.findUnique({
            where: { id },
        });
        if (!project) {
            return NextResponse.json({ error: "Project not found" }, { status: 404 });
        }
        return NextResponse.json(project);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch project" }, { status: 500 });
    }
}

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const { name } = await request.json();
        const updatedProject = await prisma.project.update({
            where: { id },
            data: { name },
        });
        return NextResponse.json(updatedProject);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        // Delete associated incidents first (or let Prisma handle it if cascade is set, 
        // but we'll do it explicitly or assume simple relation)
        // In our schema, Prisma won't automatically delete incidents unless configured.
        // Let's delete incidents first.
        await prisma.incident.deleteMany({
            where: { projectId: id },
        });

        await prisma.project.delete({
            where: { id: id },
        });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Delete project error:", error);
        return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
    }
}
