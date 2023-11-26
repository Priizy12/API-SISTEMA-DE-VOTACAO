import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import { validation } from '../../middlewares/Validation'
import * as yup from 'yup'
import { ICandidato } from "../../database/models/candidatos";
import { IPesquisador } from "../../database/models";
import * as bcrypt from 'bcryptjs'
const prisma = new PrismaClient();


interface IParamProps {
    id_Pesquisador: number;
}

interface IBodyProps extends Omit<IPesquisador, 'id_pesquisador'> {}


export const PesquisadorValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        name: yup.string().required().max(60),
        email: yup.string().required(),
        senha: yup.string().required().min(6).max(25),
        cpf: yup.string().required().min(11).max(11),
        roleId: yup.number().optional(),
        cidade: yup.string().required(),
        estado: yup.string().required()
    })),
    params: getSchema<IParamProps>(yup.object().shape({
        id_Pesquisador: yup.number().required().min(1)
    })),
}));

export const uptdate = async (req: Request<{}, {}, IBodyProps>, res: Response) => {

    const { id_Pesquisador} = req.params as IParamProps
    const { name, email, senha, cpf, roleId} = req.body;
   
    try {

        if (!req.params) return res.status(StatusCodes.BAD_REQUEST).json({mensagem: "not req.params!"})
      
        const hashPassword = await bcrypt.hash(senha, 10);
        const Pesquisador = await prisma.pesquisadores.update({
            where:{
                id_Pesquisador: Number(id_Pesquisador)
            },
            data:{
                name,
                email,
                senha: hashPassword,
                cpf,
                roleId
            }
        });

        if (!Pesquisador) {
            return res.status(StatusCodes.NOT_FOUND).json({ msg: "Esse Pesquisador não existe" });
        }

        return res.status(StatusCodes.OK).json({mensagem: "Pesquisador atualizado"});

    } catch (error) {
        console.log(error)
        return res.status(StatusCodes.NOT_FOUND).json({ msg: "Erro ao atualizar Pesquisador" })
    }
}