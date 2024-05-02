-- DropForeignKey
ALTER TABLE "UsedQRCode" DROP CONSTRAINT "UsedQRCode_productId_fkey";

-- AlterTable
ALTER TABLE "UsedQRCode" ALTER COLUMN "productId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "UsedQRCode" ADD CONSTRAINT "UsedQRCode_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("productId") ON DELETE SET NULL ON UPDATE CASCADE;
