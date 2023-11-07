import { RequestHandler } from "express";
import { PrismaClient } from '@prisma/client';
import { StatusCodes } from "http-status-codes";

const prisma = new PrismaClient();

export const getAll: RequestHandler = async (req, res) => {
    try {
        const candidatosComContagemDeVotos = await prisma.candidato.findMany({
            include: {
                votos: {
                    select: {
                        id_voto: true,
                        
                    }
                }
            }
        });

        const resultado = candidatosComContagemDeVotos.map((candidato) => ({
            id_candidato: candidato.id_candidato,
            name: candidato.name,
            totalVotos: candidato.votos.length,
        }));

        return res.status(StatusCodes.OK).json(resultado);
    } catch (error) {
        console.error(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Erro na contagem de votos" });
    }
}
