import { RequestHandler } from "express";
import { PrismaClient } from "@prisma/client";
import { StatusCodes } from "http-status-codes";

const prisma = new PrismaClient();



export const getAll: RequestHandler = async (req, res) =>{
    try {
       const Candidato = await prisma.candidato.findMany({
      });
        return res.status(StatusCodes.OK).json(Candidato);
        
    } catch (error) {
        console.log(error)
        return res.status(StatusCodes.NOT_FOUND).json({msg: "Erro na busca de solicitações"})
    }
}