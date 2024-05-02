/*
  Warnings:

  - You are about to drop the column `qrId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `isApproved` on the `QRCode` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_qrId_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "qrId",
ADD COLUMN     "isApproved" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "QRCode" DROP COLUMN "isApproved",
ADD COLUMN     "productId" INTEGER;

-- AlterTable
ALTER TABLE "UsedQRCode" ADD COLUMN     "productId" INTEGER;

-- AddForeignKey
ALTER TABLE "QRCode" ADD CONSTRAINT "QRCode_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsedQRCode" ADD CONSTRAINT "UsedQRCode_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;
