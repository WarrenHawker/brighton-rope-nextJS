/*
  Warnings:

  - Added the required column `totalTickets` to the `Waitlists` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `createdOn` on the `Waitlists` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Waitlists" ADD COLUMN     "totalTickets" INTEGER NOT NULL,
DROP COLUMN "createdOn",
ADD COLUMN     "createdOn" TIMESTAMP(3) NOT NULL;
