/*
  Warnings:

  - You are about to drop the column `estado_id` on the `Candidato` table. All the data in the column will be lost.
  - You are about to drop the column `municipio_id` on the `Candidato` table. All the data in the column will be lost.
  - You are about to drop the `Estado` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `municipio` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `bairro` to the `Candidato` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cidade` to the `Candidato` table without a default value. This is not possible if the table is not empty.
  - Added the required column `estado` to the `Candidato` table without a default value. This is not possible if the table is not empty.
  - Added the required column `logradouro` to the `Candidato` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Candidato" DROP CONSTRAINT "Candidato_estado_id_fkey";

-- DropForeignKey
ALTER TABLE "Candidato" DROP CONSTRAINT "Candidato_municipio_id_fkey";

-- AlterTable
ALTER TABLE "Candidato" DROP COLUMN "estado_id",
DROP COLUMN "municipio_id",
ADD COLUMN     "bairro" TEXT NOT NULL,
ADD COLUMN     "cidade" TEXT NOT NULL,
ADD COLUMN     "estado" TEXT NOT NULL,
ADD COLUMN     "logradouro" TEXT NOT NULL;

-- DropTable
DROP TABLE "Estado";

-- DropTable
DROP TABLE "municipio";
