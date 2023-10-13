-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" VARCHAR(60) NOT NULL,
    "cpf" VARCHAR(14) NOT NULL,
    "senha" VARCHAR(60) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "roleId" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
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
CREATE TABLE "Perguntas" (
    "idPergunta" SERIAL NOT NULL,

    CONSTRAINT "Perguntas_pkey" PRIMARY KEY ("idPergunta")
);

-- CreateTable
CREATE TABLE "Candidato" (
    "idCandidato" SERIAL NOT NULL,
    "name" VARCHAR(60) NOT NULL,
    "municipio" VARCHAR(60) NOT NULL,
    "apelido" VARCHAR(60),

    CONSTRAINT "Candidato_pkey" PRIMARY KEY ("idCandidato")
);

-- CreateTable
CREATE TABLE "Perfil_Candidato" (
    "id" SERIAL NOT NULL,
    "Url" TEXT NOT NULL,
    "FotoId" INTEGER NOT NULL,

    CONSTRAINT "Perfil_Candidato_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_cpf_key" ON "User"("cpf");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Perfil_Candidato" ADD CONSTRAINT "Perfil_Candidato_FotoId_fkey" FOREIGN KEY ("FotoId") REFERENCES "Candidato"("idCandidato") ON DELETE RESTRICT ON UPDATE CASCADE;
