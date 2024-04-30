/*
  Warnings:

  - Added the required column `authorId` to the `ActionPoint` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ActionPoint" ADD COLUMN     "authorId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "ActionPoint" ADD CONSTRAINT "ActionPoint_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
