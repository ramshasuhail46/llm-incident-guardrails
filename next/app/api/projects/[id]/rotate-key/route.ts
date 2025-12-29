import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
import { v4 as uuidv4 } from "uuid";

export async function POST(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const newApiKey = uuidv4();
        const updatedProject = await prisma.project.update({
            where: { id },
            data: { apiKey: newApiKey },
        });
        return NextResponse.json({ apiKey: updatedProject.apiKey });
    } catch (error) {
        console.error("Rotate API Key error:", error);
        return NextResponse.json({ error: "Failed to rotate API key" }, { status: 500 });
    }
}
