-- DropForeignKey
ALTER TABLE "DetailAvoirs" DROP CONSTRAINT "DetailAvoirs_CODE_ART_fkey";

-- DropForeignKey
ALTER TABLE "DetailBonliv" DROP CONSTRAINT "DetailBonliv_CODE_ART_fkey";

-- DropForeignKey
ALTER TABLE "DetailFacture" DROP CONSTRAINT "DetailFacture_CODE_ART_fkey";

-- DropForeignKey
ALTER TABLE "DevisDetail" DROP CONSTRAINT "DevisDetail_CODE_ART_fkey";

-- AddForeignKey
ALTER TABLE "DevisDetail" ADD CONSTRAINT "DevisDetail_CODE_ART_fkey" FOREIGN KEY ("CODE_ART") REFERENCES "Article"("code_art") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetailBonliv" ADD CONSTRAINT "DetailBonliv_CODE_ART_fkey" FOREIGN KEY ("CODE_ART") REFERENCES "Article"("code_art") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetailFacture" ADD CONSTRAINT "DetailFacture_CODE_ART_fkey" FOREIGN KEY ("CODE_ART") REFERENCES "Article"("code_art") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetailAvoirs" ADD CONSTRAINT "DetailAvoirs_CODE_ART_fkey" FOREIGN KEY ("CODE_ART") REFERENCES "Article"("code_art") ON DELETE CASCADE ON UPDATE CASCADE;
