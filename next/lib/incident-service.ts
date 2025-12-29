import { prisma } from "./prisma";

export async function save_ai_diagnosis(data: {
  incidentId: string;
  status: string;
  rawSignals: any;
  aiDiagnosis: any;
  confidenceScore: number;
  suggestedAction: string;
  projectId?: string;
}) {
  try {
    let finalProjectId = data.projectId;

    if (!finalProjectId) {
      const defaultProject = await prisma.project.findFirst();
      if (!defaultProject) throw new Error("No projects found in database.");
      finalProjectId = defaultProject.id;
    }

    const savedRecord = await prisma.incident.upsert({
      where: {
        incidentId: data.incidentId,
      },
      update: {
        status: data.status.toUpperCase(),
        rawSignals: data.rawSignals,
        aiDiagnosis: data.aiDiagnosis,
        confidenceScore: data.confidenceScore,
        suggestedAction: data.suggestedAction,
        projectId: finalProjectId,
      },
      create: {
        incidentId: data.incidentId,
        status: data.status.toUpperCase(),
        rawSignals: data.rawSignals,
        aiDiagnosis: data.aiDiagnosis,
        confidenceScore: data.confidenceScore,
        suggestedAction: data.suggestedAction,
        projectId: finalProjectId,
      },
    });

    console.log(`Successfully saved record with unique ID: ${savedRecord.id}`);
    return savedRecord;
  } catch (error) {
    console.error("Error saving AI diagnosis:", error);
    throw error;
  }
}
