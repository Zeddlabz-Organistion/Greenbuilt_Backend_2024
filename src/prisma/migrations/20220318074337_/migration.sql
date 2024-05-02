/*
  Warnings:

  - You are about to drop the column `sourceTypeId` on the `UOM` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[uomId]` on the table `UOM` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `uomId` to the `UOM` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "UOM_sourceTypeId_key";

-- AlterTable
ALTER TABLE "UOM" DROP COLUMN "sourceTypeId",
ADD COLUMN     "uomId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "UOM_uomId_key" ON "UOM"("uomId");
