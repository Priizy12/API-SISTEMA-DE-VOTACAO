-- DropForeignKey
ALTER TABLE "Votos" DROP CONSTRAINT "Votos_candidatoId_fkey";

-- AddForeignKey
ALTER TABLE "Votos" ADD CONSTRAINT "Votos_candidatoId_fkey" FOREIGN KEY ("candidatoId") REFERENCES "Candidato"("id_candidato") ON DELETE CASCADE ON UPDATE CASCADE;
