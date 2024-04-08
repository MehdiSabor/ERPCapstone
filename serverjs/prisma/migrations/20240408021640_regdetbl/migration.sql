/*
  Warnings:

  - The primary key for the `DetailBonliv` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "DetailBonliv" DROP CONSTRAINT "DetailBonliv_pkey",
ADD CONSTRAINT "DetailBonliv_pkey" PRIMARY KEY ("REF_BL", "CODE_ART");
