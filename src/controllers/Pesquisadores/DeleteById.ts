import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { StatusCodes } from "http-status-codes";

const prisma = new PrismaClient();


interface IParamProps {
    id_Pesquisador: number;
}


export const deleteById = async (req: Request<{}, {}, {}>, res: Response) => {

    const { id_Pesquisador } = req.params as IParamProps

    try {

        const NotExist = await prisma.pesquisadores.findUnique({
            where:{
                id_Pesquisador
            }
        })

        if(!NotExist) return res.status(StatusCodes.BAD_REQUEST).json({message: "esse pesquisador não existe"})

        if (!req.params) return res.status(StatusCodes.BAD_REQUEST).json({ message: "Not req.params" })
        const Pesquisadores = await prisma.pesquisadores.delete({
            where: {
                id_Pesquisador: Number(id_Pesquisador)
            }
        });

        return res.status(StatusCodes.OK).json({ mensagem: "Pesquisador deletado com sucesso" });

    } catch (error) {
        console.log(error)
        return res.status(StatusCodes.NOT_FOUND).json({ msg: "Erro ao deletar Pesquisador" })
    }
}