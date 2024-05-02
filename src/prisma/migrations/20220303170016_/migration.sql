-- AlterTable
ALTER TABLE "Asset" ADD COLUMN     "isTrash" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Document" ADD COLUMN     "isTrash" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "isTrash" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "updatedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "QRCode" ADD COLUMN     "isTrash" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "UsedQRCode" ADD COLUMN     "isTrash" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isTrash" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "IndustryType" (
    "id" SERIAL NOT NULL,
    "industryTypeId" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "IndustryType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SourceType" (
    "id" SERIAL NOT NULL,
    "industryTypeId" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "SourceType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PowerConsumption" (
    "id" SERIAL NOT NULL,
    "month" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "date" INTEGER NOT NULL,
    "fullDate" TIMESTAMP(3) NOT NULL,
    "totalConsumption" TEXT NOT NULL,
    "totalGreenConsumption" TEXT NOT NULL,
    "ebBill" BYTEA,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "PowerConsumption_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "IndustryType_industryTypeId_key" ON "IndustryType"("industryTypeId");

-- CreateIndex
CREATE UNIQUE INDEX "SourceType_industryTypeId_key" ON "SourceType"("industryTypeId");
