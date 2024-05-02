/*
  Warnings:

  - Made the column `ebBill` on table `PowerConsumption` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "PowerConsumption" ALTER COLUMN "ebBill" SET NOT NULL,
ALTER COLUMN "ebBill" SET DATA TYPE TEXT;
