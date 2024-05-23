-- CreateTable
CREATE TABLE "LogUserData" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "operation" TEXT NOT NULL,

    CONSTRAINT "LogUserData_pkey" PRIMARY KEY ("id")
);
