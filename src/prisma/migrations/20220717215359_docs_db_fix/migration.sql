/*
  Warnings:

  - You are about to drop the column `documents` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "documents",
ADD COLUMN     "documentCount" INTEGER;
