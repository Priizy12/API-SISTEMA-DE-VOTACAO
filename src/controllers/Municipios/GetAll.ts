import { RequestHandler } from "express";
import { PrismaClient, municipio } from '@prisma/client';
import { StatusCodes } from "http-status-codes";

const prisma = new PrismaClient();



export const getAll: RequestHandler = async (req, res) => {
    try {
        const Municipio = await prisma.municipio.findMany({
            select:{
                Municipio: true
            }
        });
        return res.status(StatusCodes.OK).json(Municipio);

    } catch (error) {
        console.log(error)
        return res.status(StatusCodes.NOT_FOUND).json({ msg: "Erro na busca de solicitações" })
    }
}