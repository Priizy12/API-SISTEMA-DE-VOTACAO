/*
  Warnings:

  - You are about to drop the column `id_voto_candidato` on the `Votos` table. All the data in the column will be lost.
  - You are about to drop the column `nao` on the `Votos` table. All the data in the column will be lost.
  - You are about to drop the column `nulo` on the `Votos` table. All the data in the column will be lost.
  - You are about to drop the column `sim` on the `Votos` table. All the data in the column will be lost.
  - Added the required column `Votar` to the `Votos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `candidatoId` to the `Votos` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Votos" DROP CONSTRAINT "Votos_id_voto_candidato_fkey";

-- AlterTable
ALTER TABLE "Votos" DROP COLUMN "id_voto_candidato",
DROP COLUMN "nao",
DROP COLUMN "nulo",
DROP COLUMN "sim",
ADD COLUMN     "Votar" BOOLEAN NOT NULL,
ADD COLUMN     "candidatoId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Votos" ADD CONSTRAINT "Votos_candidatoId_fkey" FOREIGN KEY ("candidatoId") REFERENCES "Candidato"("id_candidato") ON DELETE RESTRICT ON UPDATE CASCADE;
