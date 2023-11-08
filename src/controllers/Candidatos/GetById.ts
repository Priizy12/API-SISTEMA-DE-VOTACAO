import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import { validation } from '../../shared/middlewares/Validation'
import * as yup from 'yup'
import { ICandidato } from "../../database/models/candidatos";
const prisma = new PrismaClient();


interface IParamProps {
    id_candidato: number;
   
}

interface IBodyProps extends ICandidato { }


export const viewEvent = validation((getSchema) => ({
    params: getSchema<IParamProps>(yup.object().shape({
        id_candidato: yup.number().required().min(1)
    })),
}));

export const getById = async (req: Request<{}, {}, IBodyProps>, res: Response) => {

    const { id_candidato } = req.params as IParamProps
    try {

        if (!req.params) return res.status(StatusCodes.BAD_REQUEST).json({mensagem: "not req.params!"})
      
        const Candidato= await prisma.candidato.findFirst({
            where: {
             id_candidato: Number(id_candidato)
            },
            include: {
                images: true
            }
        });

        if (!Candidato) {

            return res.status(StatusCodes.NOT_FOUND).json({ msg: "Esse Candidato não existe" });
        }

        return res.status(StatusCodes.OK).json(Candidato);

    } catch (error) {
        console.log(error)
        return res.status(StatusCodes.NOT_FOUND).json({ msg: "Erro na busca de solicitações" })
    }
}