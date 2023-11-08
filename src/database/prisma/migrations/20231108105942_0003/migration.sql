/*
  Warnings:

  - You are about to drop the column `estado_id` on the `Candidato` table. All the data in the column will be lost.
  - You are about to drop the column `municipio_id` on the `Candidato` table. All the data in the column will be lost.
  - You are about to drop the `Estado` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `municipio` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Candidato" DROP CONSTRAINT "Candidato_estado_id_fkey";

-- DropForeignKey
ALTER TABLE "Candidato" DROP CONSTRAINT "Candidato_municipio_id_fkey";

-- AlterTable
ALTER TABLE "Candidato" DROP COLUMN "estado_id",
DROP COLUMN "municipio_id";

-- DropTable
DROP TABLE "Estado";

-- DropTable
DROP TABLE "municipio";
