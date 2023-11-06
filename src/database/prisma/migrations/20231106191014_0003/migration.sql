/*
  Warnings:

  - You are about to drop the column `estado_id` on the `Pesquisadores` table. All the data in the column will be lost.
  - You are about to drop the column `municipio_id` on the `Pesquisadores` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Pesquisadores" DROP CONSTRAINT "Pesquisadores_estado_id_fkey";

-- DropForeignKey
ALTER TABLE "Pesquisadores" DROP CONSTRAINT "Pesquisadores_municipio_id_fkey";

-- AlterTable
ALTER TABLE "Pesquisadores" DROP COLUMN "estado_id",
DROP COLUMN "municipio_id";
