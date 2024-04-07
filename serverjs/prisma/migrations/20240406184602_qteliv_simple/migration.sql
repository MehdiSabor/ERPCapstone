/*
  Warnings:

  - You are about to drop the column `qyeliv` on the `DetailBonliv` table. All the data in the column will be lost.
  - You are about to drop the column `QTEliv` on the `DevisDetail` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "DetailBonliv" DROP COLUMN "qyeliv",
ADD COLUMN     "qteliv" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "DevisDetail" DROP COLUMN "QTEliv";
