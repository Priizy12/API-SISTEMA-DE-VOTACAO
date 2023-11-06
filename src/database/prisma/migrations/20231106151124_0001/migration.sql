/*
  Warnings:

  - You are about to drop the column `id_Candidato` on the `Estado` table. All the data in the column will be lost.
  - You are about to drop the column `id_pesquisador` on the `Estado` table. All the data in the column will be lost.
  - You are about to drop the column `id_Candidato` on the `municipio` table. All the data in the column will be lost.
  - You are about to drop the column `id_pesquisador` on the `municipio` table. All the data in the column will be lost.
  - Added the required column `estado_id` to the `Candidato` table without a default value. This is not possible if the table is not empty.
  - Added the required column `municipio_id` to the `Candidato` table without a default value. This is not possible if the table is not empty.
  - Added the required column `estado_id` to the `Pesquisadores` table without a default value. This is not possible if the table is not empty.
  - Added the required column `municipio_id` to the `Pesquisadores` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Estado" DROP CONSTRAINT "Estado_id_Candidato_fkey";

-- DropForeignKey
ALTER TABLE "Estado" DROP CONSTRAINT "Estado_id_pesquisador_fkey";

-- DropForeignKey
ALTER TABLE "municipio" DROP CONSTRAINT "municipio_id_Candidato_fkey";

-- DropForeignKey
ALTER TABLE "municipio" DROP CONSTRAINT "municipio_id_pesquisador_fkey";

-- AlterTable
ALTER TABLE "Candidato" ADD COLUMN     "estado_id" INTEGER NOT NULL,
ADD COLUMN     "municipio_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Estado" DROP COLUMN "id_Candidato",
DROP COLUMN "id_pesquisador";

-- AlterTable
ALTER TABLE "Pesquisadores" ADD COLUMN     "estado_id" INTEGER NOT NULL,
ADD COLUMN     "municipio_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "municipio" DROP COLUMN "id_Candidato",
DROP COLUMN "id_pesquisador";

-- AddForeignKey
ALTER TABLE "Pesquisadores" ADD CONSTRAINT "Pesquisadores_estado_id_fkey" FOREIGN KEY ("estado_id") REFERENCES "Estado"("id_Estado") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pesquisadores" ADD CONSTRAINT "Pesquisadores_municipio_id_fkey" FOREIGN KEY ("municipio_id") REFERENCES "municipio"("idMunicipio") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Candidato" ADD CONSTRAINT "Candidato_estado_id_fkey" FOREIGN KEY ("estado_id") REFERENCES "Estado"("id_Estado") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Candidato" ADD CONSTRAINT "Candidato_municipio_id_fkey" FOREIGN KEY ("municipio_id") REFERENCES "municipio"("idMunicipio") ON DELETE RESTRICT ON UPDATE CASCADE;
