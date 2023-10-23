/*
  Warnings:

  - The primary key for the `Candidato` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `idCandidato` on the `Candidato` table. All the data in the column will be lost.
  - You are about to drop the column `municipio` on the `Candidato` table. All the data in the column will be lost.
  - You are about to drop the `Perguntas` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Respostas` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Images" DROP CONSTRAINT "Images_FotoId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_roleId_fkey";

-- AlterTable
ALTER TABLE "Candidato" DROP CONSTRAINT "Candidato_pkey",
DROP COLUMN "idCandidato",
DROP COLUMN "municipio",
ADD COLUMN     "id_candidato" SERIAL NOT NULL,
ADD CONSTRAINT "Candidato_pkey" PRIMARY KEY ("id_candidato");

-- DropTable
DROP TABLE "Perguntas";

-- DropTable
DROP TABLE "Respostas";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Pesquisadores" (
    "id_Pesquisador" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" VARCHAR(60) NOT NULL,
    "cpf" VARCHAR(14) NOT NULL,
    "senha" VARCHAR(60) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "roleId" INTEGER NOT NULL,

    CONSTRAINT "Pesquisadores_pkey" PRIMARY KEY ("id_Pesquisador")
);

-- CreateTable
CREATE TABLE "municipio" (
    "idMunicipio" SERIAL NOT NULL,
    "Municipio" TEXT NOT NULL,
    "id_pesquisador" INTEGER NOT NULL,
    "id_Candidato" INTEGER NOT NULL,

    CONSTRAINT "municipio_pkey" PRIMARY KEY ("idMunicipio")
);

-- CreateIndex
CREATE UNIQUE INDEX "Pesquisadores_email_key" ON "Pesquisadores"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Pesquisadores_cpf_key" ON "Pesquisadores"("cpf");

-- AddForeignKey
ALTER TABLE "Pesquisadores" ADD CONSTRAINT "Pesquisadores_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "municipio" ADD CONSTRAINT "municipio_id_pesquisador_fkey" FOREIGN KEY ("id_pesquisador") REFERENCES "Pesquisadores"("id_Pesquisador") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "municipio" ADD CONSTRAINT "municipio_id_Candidato_fkey" FOREIGN KEY ("id_Candidato") REFERENCES "Candidato"("id_candidato") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Images" ADD CONSTRAINT "Images_FotoId_fkey" FOREIGN KEY ("FotoId") REFERENCES "Candidato"("id_candidato") ON DELETE RESTRICT ON UPDATE CASCADE;
