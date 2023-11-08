import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import { validation } from '../../shared/middlewares/Validation'
import * as yup from 'yup'
import { IPesquisador } from "../../database/models";
const prisma = new PrismaClient();


interface IParamProps {
    id_Pesquisador: number;
}

interface IBodyProps extends IPesquisador { }


export const PesquisadorValidation = validation((getSchema) => ({
    params: getSchema<IParamProps>(yup.object().shape({
        id_Pesquisador: yup.number().required().min(1)
    })),
}));

export const getById = async (req: Request<{}, {}, IBodyProps>, res: Response) => {

    const { id_Pesquisador } = req.params as IParamProps
    try {

        if (!req.params) return res.status(StatusCodes.BAD_REQUEST).json({mensagem: "not req.params!"})
      
        const Pesquisador = await prisma.pesquisadores.findFirst({
            where: {
             id_Pesquisador: Number(id_Pesquisador)
            },
            select:{
                email: true,
                name: true,
                cpf: true
            }
        });

        if (!Pesquisador) {

            return res.status(StatusCodes.NOT_FOUND).json({ msg: "Esse Pesquisador não existe" });
        }

        return res.status(StatusCodes.OK).json(Pesquisador);

    } catch (error) {
        console.log(error)
        return res.status(StatusCodes.NOT_FOUND).json({ msg: "Erro na busca de solicitações" })
    }
}