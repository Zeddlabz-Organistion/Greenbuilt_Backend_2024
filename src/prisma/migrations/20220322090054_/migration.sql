/*
  Warnings:

  - You are about to drop the `MonthlyPlan` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "MonthlyPlan" DROP CONSTRAINT "MonthlyPlan_sourceTypeId_fkey";

-- DropForeignKey
ALTER TABLE "MonthlyPlan" DROP CONSTRAINT "MonthlyPlan_userId_fkey";

-- DropTable
DROP TABLE "MonthlyPlan";

-- CreateTable
CREATE TABLE "MontlyConsumptionPlan" (
    "id" SERIAL NOT NULL,
    "monthlyPlanId" TEXT NOT NULL,
    "month" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "date" INTEGER NOT NULL,
    "fullDate" TIMESTAMP(3) NOT NULL,
    "ownCaptive" INTEGER DEFAULT 0,
    "groupCaptive" INTEGER DEFAULT 0,
    "thirdPartyPurchase" INTEGER DEFAULT 0,
    "total" INTEGER DEFAULT 0,
    "isApproved" BOOLEAN NOT NULL DEFAULT false,
    "isTrash" BOOLEAN NOT NULL DEFAULT false,
    "sourceTypeId" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "MontlyConsumptionPlan_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MontlyConsumptionPlan" ADD CONSTRAINT "MontlyConsumptionPlan_sourceTypeId_fkey" FOREIGN KEY ("sourceTypeId") REFERENCES "SourceType"("sourceTypeId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MontlyConsumptionPlan" ADD CONSTRAINT "MontlyConsumptionPlan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
