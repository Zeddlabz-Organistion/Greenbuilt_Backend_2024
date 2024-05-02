-- AlterTable
ALTER TABLE "Asset" ADD COLUMN     "dateOfCommisioning" TEXT,
ADD COLUMN     "feeder" TEXT,
ADD COLUMN     "industryName" TEXT,
ADD COLUMN     "locationNumber" TEXT,
ADD COLUMN     "noOfWtgs" INTEGER,
ADD COLUMN     "ownCaptive" TEXT;

-- AlterTable
ALTER TABLE "MonthlyProductPlan" ADD COLUMN     "productId" TEXT;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "allottedNo" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "productCode" TEXT NOT NULL DEFAULT E'';

-- AddForeignKey
ALTER TABLE "MonthlyProductPlan" ADD CONSTRAINT "MonthlyProductPlan_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("productId") ON DELETE SET NULL ON UPDATE CASCADE;
