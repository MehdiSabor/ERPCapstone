/*
  Warnings:

  - You are about to drop the column `CODE_CON` on the `Bonliv` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Bonliv" DROP COLUMN "CODE_CON",
ADD COLUMN     "CODE_COM" INTEGER;
