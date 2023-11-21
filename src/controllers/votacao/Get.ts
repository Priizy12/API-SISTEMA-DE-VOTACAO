import { RequestHandler } from "express";
import { PrismaClient } from '@prisma/client';
import { StatusCodes } from "http-status-codes";

const prisma = new PrismaClient();

export const getAllPorEstado: RequestHandler = async (req, res) => {
    try {
        const candidatosComContagemDeVotosPorEstado = await prisma.candidato.findMany({
            include: {
                votos: {
                    select: {
                        id_voto: true,
                        
                    }
                }
            }
        });

        const resultado = candidatosComContagemDeVotosPorEstado.map((estado) => ({
            estado: estado.estado,
            cidade: estado.cidade,
            Votos: estado.votos.length
        }));

        return res.status(StatusCodes.OK).json(resultado);
    } catch (error) {
        console.error(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Erro na contagem de votos" });
    }
}
