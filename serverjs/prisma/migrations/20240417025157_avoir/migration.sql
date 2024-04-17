/*
  Warnings:

  - You are about to drop the `Detailavoirs` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Detailavoirs" DROP CONSTRAINT "Detailavoirs_CODE_ART_fkey";

-- DropForeignKey
ALTER TABLE "Detailavoirs" DROP CONSTRAINT "Detailavoirs_REF_AVR_fkey";

-- DropTable
DROP TABLE "Detailavoirs";

-- CreateTable
CREATE TABLE "DetailAvoirs" (
    "REF_AVR" TEXT NOT NULL,
    "CODE_ART" TEXT NOT NULL,
    "ARTICLE" TEXT NOT NULL,
    "QTE" DOUBLE PRECISION NOT NULL,
    "GRATUIT" DOUBLE PRECISION,
    "PV_HT" DOUBLE PRECISION NOT NULL,
    "PV_TTC" DOUBLE PRECISION NOT NULL,
    "PA_HT" DOUBLE PRECISION NOT NULL,
    "REMISE" DOUBLE PRECISION NOT NULL,
    "REMISEG" DOUBLE PRECISION,
    "TotalHT" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "TotalTTC" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "TVA" INTEGER NOT NULL,
    "MAJ_STK" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "DetailAvoirs_pkey" PRIMARY KEY ("REF_AVR","CODE_ART")
);

-- AddForeignKey
ALTER TABLE "DetailAvoirs" ADD CONSTRAINT "DetailAvoirs_CODE_ART_fkey" FOREIGN KEY ("CODE_ART") REFERENCES "Article"("code_art") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetailAvoirs" ADD CONSTRAINT "DetailAvoirs_REF_AVR_fkey" FOREIGN KEY ("REF_AVR") REFERENCES "Avoirs"("REF_AVR") ON DELETE CASCADE ON UPDATE CASCADE;
