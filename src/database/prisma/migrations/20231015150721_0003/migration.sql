/*
  Warnings:

  - Added the required column `Pergunta` to the `Perguntas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Perguntas" ADD COLUMN     "Pergunta" VARCHAR(190) NOT NULL;

-- CreateTable
CREATE TABLE "Respostas" (
    "idResposta" SERIAL NOT NULL,
    "Resposta" VARCHAR(190) NOT NULL,
    "resposta_pergunta" INTEGER NOT NULL,

    CONSTRAINT "Respostas_pkey" PRIMARY KEY ("idResposta")
);

-- AddForeignKey
ALTER TABLE "Respostas" ADD CONSTRAINT "Respostas_resposta_pergunta_fkey" FOREIGN KEY ("resposta_pergunta") REFERENCES "Perguntas"("idPergunta") ON DELETE RESTRICT ON UPDATE CASCADE;
