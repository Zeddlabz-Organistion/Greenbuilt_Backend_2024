/*
  Warnings:

  - You are about to drop the column `sourceTypeId` on the `MontlyConsumptionPlan` table. All the data in the column will be lost.
  - Added the required column `sourceType` to the `MontlyConsumptionPlan` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "MontlyConsumptionPlan" DROP CONSTRAINT "MontlyConsumptionPlan_sourceTypeId_fkey";

-- AlterTable
ALTER TABLE "MontlyConsumptionPlan" DROP COLUMN "sourceTypeId",
ADD COLUMN     "sourceType" TEXT NOT NULL;
