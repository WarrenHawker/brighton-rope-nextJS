/*
  Warnings:

  - You are about to drop the column `bookingDate` on the `Bookings` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Waitlists` table. All the data in the column will be lost.
  - You are about to drop the column `inquiryDate` on the `Waitlists` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Waitlists` table. All the data in the column will be lost.
  - Added the required column `createdOn` to the `Bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedBy` to the `Bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedOn` to the `Bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdBy` to the `Events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdOn` to the `Events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdOn` to the `UserBios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedBy` to the `UserBios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedOn` to the `UserBios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdOn` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `additionalInfo` to the `Waitlists` table without a default value. This is not possible if the table is not empty.
  - Added the required column `adminNotes` to the `Waitlists` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contact` to the `Waitlists` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdOn` to the `Waitlists` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedBy` to the `Waitlists` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedOn` to the `Waitlists` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'INACTIVE';

-- AlterTable
ALTER TABLE "Bookings" DROP COLUMN "bookingDate",
ADD COLUMN     "createdOn" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updatedBy" JSONB NOT NULL,
ADD COLUMN     "updatedOn" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Events" ADD COLUMN     "createdBy" JSONB NOT NULL,
ADD COLUMN     "createdOn" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updatedBy" JSONB,
ADD COLUMN     "updatedOn" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "UserBios" ADD COLUMN     "createdOn" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updatedBy" JSONB NOT NULL,
ADD COLUMN     "updatedOn" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "claimedOn" TIMESTAMP(3),
ADD COLUMN     "createdOn" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Waitlists" DROP COLUMN "email",
DROP COLUMN "inquiryDate",
DROP COLUMN "name",
ADD COLUMN     "additionalInfo" TEXT NOT NULL,
ADD COLUMN     "adminNotes" TEXT NOT NULL,
ADD COLUMN     "contact" JSONB NOT NULL,
ADD COLUMN     "createdOn" TEXT NOT NULL,
ADD COLUMN     "updatedBy" JSONB NOT NULL,
ADD COLUMN     "updatedOn" TIMESTAMP(3) NOT NULL;
