/*
  Warnings:

  - You are about to drop the column `allottedNo` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the `MonthlyProductPlan` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "MonthlyProductPlan" DROP CONSTRAINT "MonthlyProductPlan_productId_fkey";

-- DropForeignKey
ALTER TABLE "MonthlyProductPlan" DROP CONSTRAINT "MonthlyProductPlan_userId_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "allottedNo";

-- DropTable
DROP TABLE "MonthlyProductPlan";
