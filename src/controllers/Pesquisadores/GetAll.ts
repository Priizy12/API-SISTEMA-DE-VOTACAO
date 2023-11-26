import { RequestHandler } from "express";
import { PrismaClient } from '@prisma/client';
import { StatusCodes } from "http-status-codes";

const prisma = new PrismaClient();



export const getAll: RequestHandler = async (req, res) => {
    try {
        const Pesquisadores = await prisma.pesquisadores.findMany({
            select: {
                id_Pesquisador: true,
                name: true,
                email:true,
                cpf: true,
                cidade: true,
                estado: true,
                senha: true
            }
        });
        return res.status(StatusCodes.OK).json(Pesquisadores);

    } catch (error) {
        console.log(error)
        return res.status(StatusCodes.NOT_FOUND).json({ msg: "Erro na busca de solicitações" })
    }
}