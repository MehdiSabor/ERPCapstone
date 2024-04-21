/*
  Warnings:

  - You are about to drop the column `REMISEG` on the `DetailBonliv` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Bonliv" ADD COLUMN     "REMISEG" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "DetailBonliv" DROP COLUMN "REMISEG";
