-- CreateTable
CREATE TABLE "Incident" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT,
    "incidentId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "rawSignals" JSONB NOT NULL,
    "aiDiagnosis" JSONB,
    "confidenceScore" DOUBLE PRECISION,
    "suggestedAction" TEXT,

    CONSTRAINT "Incident_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Incident_userId_idx" ON "Incident"("userId");
