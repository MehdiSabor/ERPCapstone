-- DropForeignKey
ALTER TABLE "DetailBonliv" DROP CONSTRAINT "DetailBonliv_REF_BL_fkey";

-- DropForeignKey
ALTER TABLE "DetailFacture" DROP CONSTRAINT "DetailFacture_REF_FAC_fkey";

-- DropForeignKey
ALTER TABLE "DevisDetail" DROP CONSTRAINT "DevisDetail_REF_DEV_fkey";

-- AddForeignKey
ALTER TABLE "DevisDetail" ADD CONSTRAINT "DevisDetail_REF_DEV_fkey" FOREIGN KEY ("REF_DEV") REFERENCES "Devis"("REF_DEV") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetailBonliv" ADD CONSTRAINT "DetailBonliv_REF_BL_fkey" FOREIGN KEY ("REF_BL") REFERENCES "Bonliv"("REF_BL") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetailFacture" ADD CONSTRAINT "DetailFacture_REF_FAC_fkey" FOREIGN KEY ("REF_FAC") REFERENCES "Facture"("REF_FAC") ON DELETE CASCADE ON UPDATE CASCADE;
