import { save_ai_diagnosis } from "./incident-service";

async function test() {
  const mockData = {
    incidentId: "test-incident-123",
    status: "diagnosed",
    rawSignals: { cpu: 90, memory: 80 },
    aiDiagnosis: { issue: "High CPU usage", rootCause: "Background process" },
    confidenceScore: 0.95,
    suggestedAction: "Scale up instances",
  };

  try {
    console.log("Starting test: save_ai_diagnosis");
    const result = await save_ai_diagnosis(mockData);
    console.log("Test result:", JSON.stringify(result, null, 2));
  } catch (error) {
    console.error("Test failed:", error);
  }
}

test();
