import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { StatusCodes } from "http-status-codes";

const prisma = new PrismaClient();


interface IParamProps {
    id_candidato: number;
}


export const deleteById = async (req: Request<{}, {}, {}>, res: Response) => {

    const { id_candidato } = req.params as IParamProps

    try {
        if (!req.params) return res.status(StatusCodes.BAD_REQUEST).json({ mensagem: "not req.params!" })

        const candidato = await prisma.candidato.delete({
            where: {
                id_candidato: Number(id_candidato)
            },
            include: {
                images: true,
                votos: true
            }
        });
        console.log(candidato)
        return res.status(StatusCodes.OK).json({ mensagem: "Candidato deletado com sucesso" });

    } catch (error) {
        console.log(error)
        return res.status(StatusCodes.NOT_FOUND).json({ msg: "Erro ao deletar Candidato" })
    }
}