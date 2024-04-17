/*
  Warnings:

  - The primary key for the `DetailFacture` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "DetailFacture" DROP CONSTRAINT "DetailFacture_pkey",
ADD CONSTRAINT "DetailFacture_pkey" PRIMARY KEY ("REF_FAC", "CODE_ART");
