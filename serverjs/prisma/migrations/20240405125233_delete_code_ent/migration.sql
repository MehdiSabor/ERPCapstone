/*
  Warnings:

  - You are about to drop the column `CODE_ENT` on the `Avoirs` table. All the data in the column will be lost.
  - You are about to drop the column `CODE_ENT` on the `Bonliv` table. All the data in the column will be lost.
  - You are about to drop the column `CODE_ENT` on the `Devis` table. All the data in the column will be lost.
  - You are about to drop the column `CODE_ENT` on the `Facture` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Avoirs" DROP COLUMN "CODE_ENT";

-- AlterTable
ALTER TABLE "Bonliv" DROP COLUMN "CODE_ENT";

-- AlterTable
ALTER TABLE "Devis" DROP COLUMN "CODE_ENT";

-- AlterTable
ALTER TABLE "Facture" DROP COLUMN "CODE_ENT";
