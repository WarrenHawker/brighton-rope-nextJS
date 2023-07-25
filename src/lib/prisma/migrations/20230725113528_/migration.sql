/*
  Warnings:

  - You are about to drop the column `name` on the `Users` table. All the data in the column will be lost.
  - Added the required column `name` to the `UserBios` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserBios" ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "name",
ALTER COLUMN "preferences" DROP NOT NULL;
