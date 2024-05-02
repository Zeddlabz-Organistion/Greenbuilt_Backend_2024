/*
  Warnings:

  - You are about to drop the column `industryTypeId` on the `SourceType` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[sourceTypeId]` on the table `SourceType` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `sourceTypeId` to the `SourceType` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "SourceType_industryTypeId_key";

-- AlterTable
ALTER TABLE "SourceType" DROP COLUMN "industryTypeId",
ADD COLUMN     "sourceTypeId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "SourceType_sourceTypeId_key" ON "SourceType"("sourceTypeId");
