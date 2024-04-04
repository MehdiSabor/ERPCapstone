/*
  Warnings:

  - You are about to drop the `Entrepot` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Stock` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `qte_stk` to the `Article` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Stock" DROP CONSTRAINT "Stock_code_art_fkey";

-- DropForeignKey
ALTER TABLE "Stock" DROP CONSTRAINT "Stock_code_ent_fkey";

-- AlterTable
ALTER TABLE "Article" ADD COLUMN     "qte_stk" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Entrepot";

-- DropTable
DROP TABLE "Stock";
