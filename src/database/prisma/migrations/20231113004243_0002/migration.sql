/*
  Warnings:

  - You are about to drop the column `bairro` on the `Candidato` table. All the data in the column will be lost.
  - You are about to drop the column `logradouro` on the `Candidato` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Candidato" DROP COLUMN "bairro",
DROP COLUMN "logradouro";
