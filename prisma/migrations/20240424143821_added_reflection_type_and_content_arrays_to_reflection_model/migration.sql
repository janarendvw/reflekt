/*
  Warnings:

  - The `content` column on the `Reflection` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `reflectionType` to the `Reflection` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ReflectionModelType" AS ENUM ('STARR', 'KORTHAGEN');

-- AlterTable
ALTER TABLE "Reflection" ADD COLUMN     "reflectionType" "ReflectionModelType" NOT NULL,
DROP COLUMN "content",
ADD COLUMN     "content" TEXT[];
