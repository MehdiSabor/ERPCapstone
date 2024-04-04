/*
  Warnings:

  - The primary key for the `DevisDetail` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "DevisDetail" DROP CONSTRAINT "DevisDetail_pkey",
ADD CONSTRAINT "DevisDetail_pkey" PRIMARY KEY ("REF_DEV", "CODE_ART");
