-- DropForeignKey
ALTER TABLE "Article" DROP CONSTRAINT "Article_Code_fam_fkey";

-- DropForeignKey
ALTER TABLE "Article" DROP CONSTRAINT "Article_code_frs_fkey";

-- DropForeignKey
ALTER TABLE "Avoirs" DROP CONSTRAINT "Avoirs_CODE_CLT_fkey";

-- DropForeignKey
ALTER TABLE "Bonliv" DROP CONSTRAINT "Bonliv_CODE_CLT_fkey";

-- DropForeignKey
ALTER TABLE "Client" DROP CONSTRAINT "Client_code_com_fkey";

-- DropForeignKey
ALTER TABLE "Devis" DROP CONSTRAINT "Devis_CODE_CLT_fkey";

-- DropForeignKey
ALTER TABLE "Devis" DROP CONSTRAINT "Devis_CODE_COM_fkey";

-- DropForeignKey
ALTER TABLE "Facture" DROP CONSTRAINT "Facture_CODE_CLT_fkey";

-- DropForeignKey
ALTER TABLE "Reglement" DROP CONSTRAINT "Reglement_CODE_CLT_fkey";

-- DropForeignKey
ALTER TABLE "ReglementDetail" DROP CONSTRAINT "ReglementDetail_REF_AV_FAC_fkey";

-- DropForeignKey
ALTER TABLE "ReglementDetail" DROP CONSTRAINT "ReglementDetail_REF_REGV_fkey";

-- DropForeignKey
ALTER TABLE "UnifiedFactureAvoir" DROP CONSTRAINT "UnifiedFactureAvoir_code_clt_fkey";

-- AddForeignKey
ALTER TABLE "Client" ADD CONSTRAINT "Client_code_com_fkey" FOREIGN KEY ("code_com") REFERENCES "Comercial"("code_com") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_code_frs_fkey" FOREIGN KEY ("code_frs") REFERENCES "Fournisseur"("code_frs") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_Code_fam_fkey" FOREIGN KEY ("Code_fam") REFERENCES "famille"("code_fam") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Devis" ADD CONSTRAINT "Devis_CODE_CLT_fkey" FOREIGN KEY ("CODE_CLT") REFERENCES "Client"("code_clt") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Devis" ADD CONSTRAINT "Devis_CODE_COM_fkey" FOREIGN KEY ("CODE_COM") REFERENCES "Comercial"("code_com") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bonliv" ADD CONSTRAINT "Bonliv_CODE_CLT_fkey" FOREIGN KEY ("CODE_CLT") REFERENCES "Client"("code_clt") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Facture" ADD CONSTRAINT "Facture_CODE_CLT_fkey" FOREIGN KEY ("CODE_CLT") REFERENCES "Client"("code_clt") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Avoirs" ADD CONSTRAINT "Avoirs_CODE_CLT_fkey" FOREIGN KEY ("CODE_CLT") REFERENCES "Client"("code_clt") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reglement" ADD CONSTRAINT "Reglement_CODE_CLT_fkey" FOREIGN KEY ("CODE_CLT") REFERENCES "Client"("code_clt") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReglementDetail" ADD CONSTRAINT "ReglementDetail_REF_AV_FAC_fkey" FOREIGN KEY ("REF_AV_FAC") REFERENCES "UnifiedFactureAvoir"("REF_AV_FAC") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReglementDetail" ADD CONSTRAINT "ReglementDetail_REF_REGV_fkey" FOREIGN KEY ("REF_REGV") REFERENCES "Reglement"("REF_REGV") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UnifiedFactureAvoir" ADD CONSTRAINT "UnifiedFactureAvoir_code_clt_fkey" FOREIGN KEY ("code_clt") REFERENCES "Client"("code_clt") ON DELETE CASCADE ON UPDATE CASCADE;
