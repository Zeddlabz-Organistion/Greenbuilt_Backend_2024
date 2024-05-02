/*
  Warnings:

  - Added the required column `industryType` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `packingType` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uom` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "industryType" TEXT NOT NULL,
ADD COLUMN     "packingType" TEXT NOT NULL,
ADD COLUMN     "uom" TEXT NOT NULL;
