-- CreateTable
CREATE TABLE "ActionPoint" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "reflectionId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "resolved" BOOLEAN NOT NULL,

    CONSTRAINT "ActionPoint_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ActionPoint_id_key" ON "ActionPoint"("id");

-- AddForeignKey
ALTER TABLE "ActionPoint" ADD CONSTRAINT "ActionPoint_reflectionId_fkey" FOREIGN KEY ("reflectionId") REFERENCES "Reflection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
