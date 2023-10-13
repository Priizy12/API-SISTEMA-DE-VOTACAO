/*
  Warnings:

  - You are about to drop the `Perfil_Candidato` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Perfil_Candidato" DROP CONSTRAINT "Perfil_Candidato_FotoId_fkey";

-- DropTable
DROP TABLE "Perfil_Candidato";

-- CreateTable
CREATE TABLE "Images" (
    "id" SERIAL NOT NULL,
    "Url" TEXT NOT NULL,
    "FotoId" INTEGER NOT NULL,

    CONSTRAINT "Images_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Images" ADD CONSTRAINT "Images_FotoId_fkey" FOREIGN KEY ("FotoId") REFERENCES "Candidato"("idCandidato") ON DELETE RESTRICT ON UPDATE CASCADE;
