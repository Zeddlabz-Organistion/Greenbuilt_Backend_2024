-- CreateTable
CREATE TABLE "MonthlyProductPlan" (
    "id" SERIAL NOT NULL,
    "monthlyPlanId" TEXT NOT NULL,
    "month" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "date" INTEGER NOT NULL,
    "fullDate" TIMESTAMP(3) NOT NULL,
    "productName" TEXT NOT NULL,
    "uom" TEXT NOT NULL,
    "totalProduction" INTEGER NOT NULL,
    "qrCodeRequired" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "MonthlyProductPlan_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MonthlyProductPlan" ADD CONSTRAINT "MonthlyProductPlan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
