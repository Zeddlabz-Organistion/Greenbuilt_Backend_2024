-- CreateTable
CREATE TABLE "UOM" (
    "id" SERIAL NOT NULL,
    "sourceTypeId" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "UOM_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UOM_sourceTypeId_key" ON "UOM"("sourceTypeId");
