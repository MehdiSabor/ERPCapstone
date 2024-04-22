/*
  Warnings:

  - You are about to drop the column `CanCreateQuote` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `CanDeleteQuote` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `CanReadQuote` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `CanUpdateQuote` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "CanCreateQuote",
DROP COLUMN "CanDeleteQuote",
DROP COLUMN "CanReadQuote",
DROP COLUMN "CanUpdateQuote",
ADD COLUMN     "CanManageQuote" BOOLEAN NOT NULL DEFAULT false;
