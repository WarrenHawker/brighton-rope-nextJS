/*
  Warnings:

  - You are about to drop the column `hashedPassword` on the `Users` table. All the data in the column will be lost.
  - Added the required column `password` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedBy` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedOn` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Users" DROP COLUMN "hashedPassword",
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "updatedBy" JSONB NOT NULL,
ADD COLUMN     "updatedOn" TIMESTAMP(3) NOT NULL;
