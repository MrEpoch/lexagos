-- AlterTable
ALTER TABLE "Course" ALTER COLUMN "imageSignature" DROP NOT NULL,
ALTER COLUMN "imageUrl" DROP NOT NULL,
ALTER COLUMN "publicId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "coursesJoined" TEXT[];
