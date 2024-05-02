/*
  Warnings:

  - You are about to drop the column `documentCount` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "documentCount",
ADD COLUMN     "document" TEXT[];
