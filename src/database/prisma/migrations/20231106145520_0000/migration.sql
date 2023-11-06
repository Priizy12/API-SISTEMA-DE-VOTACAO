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

    CONSTRAINT "Candidato_pkey" PRIMARY KEY ("id_candidato")
);

-- CreateTable
CREATE TABLE "municipio" (
    "idMunicipio" SERIAL NOT NULL,
    "Municipio" TEXT NOT NULL,
    "id_pesquisador" INTEGER NOT NULL,
    "id_Candidato" INTEGER NOT NULL,

    CONSTRAINT "municipio_pkey" PRIMARY KEY ("idMunicipio")
);

-- CreateTable
CREATE TABLE "Estado" (
    "id_Estado" SERIAL NOT NULL,
    "Estado" TEXT NOT NULL,
    "uf" VARCHAR(2) NOT NULL,
    "id_pesquisador" INTEGER NOT NULL,
    "id_Candidato" INTEGER NOT NULL,

    CONSTRAINT "Estado_pkey" PRIMARY KEY ("id_Estado")
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
    "sim" BOOLEAN,
    "nao" BOOLEAN,
    "nulo" BOOLEAN,
    "id_voto_candidato" INTEGER NOT NULL,

    CONSTRAINT "Votos_pkey" PRIMARY KEY ("id_voto")
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
ALTER TABLE "Estado" ADD CONSTRAINT "Estado_id_pesquisador_fkey" FOREIGN KEY ("id_pesquisador") REFERENCES "Pesquisadores"("id_Pesquisador") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Estado" ADD CONSTRAINT "Estado_id_Candidato_fkey" FOREIGN KEY ("id_Candidato") REFERENCES "Candidato"("id_candidato") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Images" ADD CONSTRAINT "Images_FotoId_fkey" FOREIGN KEY ("FotoId") REFERENCES "Candidato"("id_candidato") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Votos" ADD CONSTRAINT "Votos_id_voto_candidato_fkey" FOREIGN KEY ("id_voto_candidato") REFERENCES "Candidato"("id_candidato") ON DELETE RESTRICT ON UPDATE CASCADE;
