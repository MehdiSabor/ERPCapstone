/*
  Warnings:

  - You are about to drop the column `familleCode_fam` on the `Article` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Article" DROP CONSTRAINT "Article_familleCode_fam_fkey";

-- DropForeignKey
ALTER TABLE "DetailAvoirs" DROP CONSTRAINT "DetailAvoirs_CODE_ART_fkey";

-- DropForeignKey
ALTER TABLE "DetailBonliv" DROP CONSTRAINT "DetailBonliv_CODE_ART_fkey";

-- DropForeignKey
ALTER TABLE "DetailFacture" DROP CONSTRAINT "DetailFacture_CODE_ART_fkey";

-- DropForeignKey
ALTER TABLE "DevisDetail" DROP CONSTRAINT "DevisDetail_CODE_ART_fkey";

-- AlterTable
ALTER TABLE "Article" DROP COLUMN "familleCode_fam";

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_Code_fam_fkey" FOREIGN KEY ("Code_fam") REFERENCES "famille"("code_fam") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DevisDetail" ADD CONSTRAINT "DevisDetail_CODE_ART_fkey" FOREIGN KEY ("CODE_ART") REFERENCES "Article"("code_art") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetailBonliv" ADD CONSTRAINT "DetailBonliv_CODE_ART_fkey" FOREIGN KEY ("CODE_ART") REFERENCES "Article"("code_art") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetailFacture" ADD CONSTRAINT "DetailFacture_CODE_ART_fkey" FOREIGN KEY ("CODE_ART") REFERENCES "Article"("code_art") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetailAvoirs" ADD CONSTRAINT "DetailAvoirs_CODE_ART_fkey" FOREIGN KEY ("CODE_ART") REFERENCES "Article"("code_art") ON DELETE SET NULL ON UPDATE CASCADE;
