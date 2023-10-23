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

interface IBodyProps extends Omit<ICandidato, 'id_candidato'> {}


export const viewEvent = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        name: yup.string().required().max(60),
        apelido: yup.string().optional()
    })),
    params: getSchema<IParamProps>(yup.object().shape({
        id_candidato: yup.number().required().min(1)
    })),
}));

export const uptdate = async (req: Request<IParamProps, {}, IBodyProps>, res: Response) => {

    const { id_candidato} = req.params
    const { name, apelido} = req.body;
    const requestImages = req.files as Express.Multer.File[];
    try {

        if (!req.params) return res.status(StatusCodes.BAD_REQUEST).json({mensagem: "not req.params!"})
      
        const images = requestImages.map((image) =>{
            return {
                Url: image.filename
            }
        });
        const Candidato = await prisma.candidato.update({
            where:{
                id_candidato: Number(id_candidato)
            },
            data:{
                name,
                apelido,
               images:{
                create: images
               }
            }
        });

        if (!Candidato) {
            return res.status(StatusCodes.NOT_FOUND).json({ msg: "Esse Candidato não existe" });
        }

        return res.status(StatusCodes.OK).json({mensagem: "Candidato atualizado"});

    } catch (error) {
        console.log(error)
        return res.status(StatusCodes.NOT_FOUND).json({ msg: "Erro ao atualizar Candidato" })
    }
}