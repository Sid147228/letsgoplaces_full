/*
  Warnings:

  - Added the required column `title` to the `Trip` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Trip" ADD COLUMN     "endDate" TEXT,
ADD COLUMN     "imageUrl" TEXT,
ADD COLUMN     "startDate" TEXT,
ADD COLUMN     "title" TEXT NOT NULL;
