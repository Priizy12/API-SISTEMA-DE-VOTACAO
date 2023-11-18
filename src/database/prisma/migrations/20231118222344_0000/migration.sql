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
CREATE TABLE "Role" (
    "id" SERIAL NOT NULL,
    "Role" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Candidato" (
    "id_candidato" SERIAL NOT NULL,
    "name" VARCHAR(60) NOT NULL,
    "apelido" VARCHAR(60),
    "Partido" TEXT,
    "cidade" TEXT NOT NULL,
    "estado" TEXT NOT NULL,

    CONSTRAINT "Candidato_pkey" PRIMARY KEY ("id_candidato")
);

-- CreateTable
CREATE TABLE "Images" (
    "id" SERIAL NOT NULL,
    "Url" TEXT NOT NULL,
    "FotoId" INTEGER NOT NULL,

    CONSTRAINT "Images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Votos" (
    "id_voto" SERIAL NOT NULL,
    "nome" VARCHAR(60) NOT NULL,
    "Idade" INTEGER NOT NULL,
    "Localidade" VARCHAR(60) NOT NULL,
    "Votar" BOOLEAN NOT NULL,
    "candidatoId" INTEGER NOT NULL,

    CONSTRAINT "Votos_pkey" PRIMARY KEY ("id_voto")
);

-- CreateIndex
CREATE UNIQUE INDEX "Pesquisadores_email_key" ON "Pesquisadores"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Pesquisadores_cpf_key" ON "Pesquisadores"("cpf");

-- AddForeignKey
ALTER TABLE "Pesquisadores" ADD CONSTRAINT "Pesquisadores_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Images" ADD CONSTRAINT "Images_FotoId_fkey" FOREIGN KEY ("FotoId") REFERENCES "Candidato"("id_candidato") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Votos" ADD CONSTRAINT "Votos_candidatoId_fkey" FOREIGN KEY ("candidatoId") REFERENCES "Candidato"("id_candidato") ON DELETE RESTRICT ON UPDATE CASCADE;
