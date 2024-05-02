/*
  Warnings:

  - The `ebBill` column on the `PowerConsumption` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "PowerConsumption" DROP COLUMN "ebBill",
ADD COLUMN     "ebBill" BYTEA;
