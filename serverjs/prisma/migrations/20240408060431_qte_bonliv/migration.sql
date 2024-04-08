/*
  Warnings:

  - You are about to drop the column `QTECMD` on the `DetailBonliv` table. All the data in the column will be lost.
  - You are about to drop the column `QTECTRL` on the `DetailBonliv` table. All the data in the column will be lost.
  - You are about to drop the column `QTEGRA` on the `DetailBonliv` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Bonliv" ADD COLUMN     "MNT_HTliv" DOUBLE PRECISION,
ADD COLUMN     "MNT_TTCliv" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "DetailBonliv" DROP COLUMN "QTECMD",
DROP COLUMN "QTECTRL",
DROP COLUMN "QTEGRA",
ADD COLUMN     "TotalHT" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "TotalHTliv" DOUBLE PRECISION,
ADD COLUMN     "TotalTTC" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "TotalTTCliv" DOUBLE PRECISION,
ALTER COLUMN "qteliv" DROP NOT NULL,
ALTER COLUMN "qteliv" DROP DEFAULT;
