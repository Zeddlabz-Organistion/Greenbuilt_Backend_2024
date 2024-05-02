/*
  Warnings:

  - You are about to drop the column `sourceTypeId` on the `Asset` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Asset" DROP CONSTRAINT "Asset_sourceTypeId_fkey";

-- AlterTable
ALTER TABLE "Asset" DROP COLUMN "sourceTypeId";
