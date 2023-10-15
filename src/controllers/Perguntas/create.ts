import { PrismaClient } from "@prisma/client";
import { RequestHandler, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { validation } from "../../shared/middlewares/Validation";
import { IPergunta } from "../../database/models/Perguntas";
const prisma = new PrismaClient();

interface IBodyProps extends Omit<IPergunta, "idPergunta" > {}

export const candidatoUpValidation = validation((getSchema) => ({
	body: getSchema<IBodyProps>(
		yup.object().shape({
			Pergunta: yup.string().required().max(190)
		})
	),
}));

export const create = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
const { Pergunta } = req.body;


try {
    const newQuestion = await prisma.perguntas.create({
        data:{
            Pergunta
        }
    })
    return res.status(StatusCodes.OK).json({
        mensagem: "Pergunta criada com sucesso"
    })
} catch (error) {
    console.log(error)
    return res.status(StatusCodes.OK).json({
        mensagem: "Erro na criação da pergunta"
    })
}
};


