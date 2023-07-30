/*
  Warnings:

  - The values [NULL] on the enum `Position` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `imageUrl` to the `UserBios` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Position_new" AS ENUM ('RIGGER', 'SWITCH', 'BOTTOM', 'OTHER');
ALTER TABLE "UserBios" ALTER COLUMN "position" DROP DEFAULT;
ALTER TABLE "UserBios" ALTER COLUMN "position" TYPE "Position_new" USING ("position"::text::"Position_new");
ALTER TYPE "Position" RENAME TO "Position_old";
ALTER TYPE "Position_new" RENAME TO "Position";
DROP TYPE "Position_old";
ALTER TABLE "UserBios" ALTER COLUMN "position" SET DEFAULT 'OTHER';
COMMIT;

-- AlterTable
ALTER TABLE "UserBios" ADD COLUMN     "imageUrl" TEXT NOT NULL,
ALTER COLUMN "position" SET DEFAULT 'OTHER';
