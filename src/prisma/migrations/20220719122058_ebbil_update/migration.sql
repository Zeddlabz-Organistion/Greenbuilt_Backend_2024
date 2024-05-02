/*
  Warnings:

  - You are about to drop the column `ebBill` on the `PowerConsumption` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PowerConsumption" DROP COLUMN "ebBill",
ADD COLUMN     "ebBillLocation" TEXT;
