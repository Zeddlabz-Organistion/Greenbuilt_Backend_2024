-- DropForeignKey
ALTER TABLE "QRCode" DROP CONSTRAINT "QRCode_productId_fkey";

-- AlterTable
ALTER TABLE "QRCode" ALTER COLUMN "productId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "QRCode" ADD CONSTRAINT "QRCode_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("productId") ON DELETE SET NULL ON UPDATE CASCADE;
