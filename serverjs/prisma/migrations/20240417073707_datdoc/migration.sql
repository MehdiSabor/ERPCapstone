/*
  Warnings:

  - The primary key for the `ReglementDetail` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "ReglementDetail" DROP CONSTRAINT "ReglementDetail_pkey",
ADD CONSTRAINT "ReglementDetail_pkey" PRIMARY KEY ("REF_REGV", "REF_AV_FAC");
