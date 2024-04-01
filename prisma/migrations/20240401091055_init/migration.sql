/*
  Warnings:

  - You are about to drop the column `photo` on the `Course` table. All the data in the column will be lost.
  - Added the required column `imageSignature` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageUrl` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `publicId` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Course" DROP COLUMN "photo",
ADD COLUMN     "imageSignature" TEXT NOT NULL,
ADD COLUMN     "imageUrl" TEXT NOT NULL,
ADD COLUMN     "publicId" TEXT NOT NULL;
