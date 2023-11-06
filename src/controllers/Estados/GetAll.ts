import { RequestHandler } from "express";
import { PrismaClient, municipio } from '@prisma/client';
import { StatusCodes } from "http-status-codes";

const prisma = new PrismaClient();



export const getAll: RequestHandler = async (req, res) => {
    try {
        const Estado = await prisma.estado.findMany({
            select:{
                Estado: true,
                uf: false
            }
        });
        return res.status(StatusCodes.OK).json(Estado);

    } catch (error) {
        console.log(error)
        return res.status(StatusCodes.NOT_FOUND).json({ msg: "Erro na busca de solicitações" })
    }
}