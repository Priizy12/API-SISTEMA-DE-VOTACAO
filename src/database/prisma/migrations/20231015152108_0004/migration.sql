/*
  Warnings:

  - You are about to drop the column `resposta_pergunta` on the `Respostas` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Respostas" DROP CONSTRAINT "Respostas_resposta_pergunta_fkey";

-- AlterTable
ALTER TABLE "Respostas" DROP COLUMN "resposta_pergunta";
