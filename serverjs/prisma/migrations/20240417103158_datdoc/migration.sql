/*
  Warnings:

  - You are about to drop the column `code_sfam` on the `Article` table. All the data in the column will be lost.
  - You are about to drop the `sfamille` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "sfamille" DROP CONSTRAINT "sfamille_code_fam_fkey";

-- AlterTable
ALTER TABLE "Article" DROP COLUMN "code_sfam";

-- DropTable
DROP TABLE "sfamille";
