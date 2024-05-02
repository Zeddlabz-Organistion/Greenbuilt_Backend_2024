-- CreateTable
CREATE TABLE "MonthlyPlan" (
    "id" SERIAL NOT NULL,
    "monthlyPlanId" TEXT NOT NULL,
    "month" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "date" INTEGER NOT NULL,
    "fullDate" TIMESTAMP(3) NOT NULL,
    "ownCaptive" INTEGER NOT NULL,
    "groupCaptive" INTEGER NOT NULL,
    "thirdPartyPurchase" INTEGER NOT NULL,
    "total" INTEGER NOT NULL,
    "sourceTypeId" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "MonthlyPlan_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MonthlyPlan" ADD CONSTRAINT "MonthlyPlan_sourceTypeId_fkey" FOREIGN KEY ("sourceTypeId") REFERENCES "SourceType"("sourceTypeId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MonthlyPlan" ADD CONSTRAINT "MonthlyPlan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
