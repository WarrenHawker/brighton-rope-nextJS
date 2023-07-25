/*
  Warnings:

  - You are about to drop the column `password` on the `Users` table. All the data in the column will be lost.
  - Added the required column `hashedPassword` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `preferences` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `Users` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "Position" AS ENUM ('RIGGER', 'SWITCH', 'BOTTOM', 'NULL');

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "password",
ADD COLUMN     "claimed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "hashedPassword" TEXT NOT NULL,
ADD COLUMN     "preferences" JSONB NOT NULL,
ALTER COLUMN "name" SET NOT NULL;

-- CreateTable
CREATE TABLE "UserBios" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "pronouns" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "position" "Position" NOT NULL DEFAULT 'NULL',
    "public" BOOLEAN NOT NULL,

    CONSTRAINT "UserBios_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserBios_email_key" ON "UserBios"("email");

-- AddForeignKey
ALTER TABLE "UserBios" ADD CONSTRAINT "UserBios_email_fkey" FOREIGN KEY ("email") REFERENCES "Users"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
