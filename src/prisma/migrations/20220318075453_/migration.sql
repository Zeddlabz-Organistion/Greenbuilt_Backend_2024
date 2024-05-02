-- CreateTable
CREATE TABLE "PackagingType" (
    "id" SERIAL NOT NULL,
    "packagingTypeId" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "PackagingType_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PackagingType_packagingTypeId_key" ON "PackagingType"("packagingTypeId");
