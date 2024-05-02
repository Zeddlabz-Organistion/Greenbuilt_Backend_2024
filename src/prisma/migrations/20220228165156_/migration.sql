/*
  Warnings:

  - A unique constraint covering the columns `[docId]` on the table `Document` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Document_docId_key" ON "Document"("docId");
