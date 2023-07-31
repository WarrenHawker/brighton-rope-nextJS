/*
  Warnings:

  - You are about to drop the `UserBios` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserBios" DROP CONSTRAINT "UserBios_email_fkey";

-- DropTable
DROP TABLE "UserBios";

-- CreateTable
CREATE TABLE "Teachers" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "pronouns" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "position" "Position" NOT NULL DEFAULT 'OTHER',
    "public" BOOLEAN NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "createdOn" TIMESTAMP(3) NOT NULL,
    "updatedOn" TIMESTAMP(3) NOT NULL,
    "updatedBy" JSONB NOT NULL,

    CONSTRAINT "Teachers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Teachers_email_key" ON "Teachers"("email");

-- AddForeignKey
ALTER TABLE "Teachers" ADD CONSTRAINT "Teachers_email_fkey" FOREIGN KEY ("email") REFERENCES "Users"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
