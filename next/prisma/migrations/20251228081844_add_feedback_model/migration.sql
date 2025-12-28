/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `Feedback` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Feedback" DROP CONSTRAINT "Feedback_organizationId_fkey";

-- DropIndex
DROP INDEX "Feedback_organizationId_idx";

-- DropIndex
DROP INDEX "Feedback_status_idx";

-- AlterTable
ALTER TABLE "Feedback" DROP COLUMN "updatedAt",
ALTER COLUMN "organizationId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;
