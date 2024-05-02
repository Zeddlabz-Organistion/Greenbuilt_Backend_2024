/*
  Warnings:

  - You are about to drop the column `document` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "document",
ADD COLUMN     "documentArray" TEXT[];
