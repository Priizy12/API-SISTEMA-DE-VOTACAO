import { PrismaClient } from "@prisma/client";
import { RequestHandler, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { validation } from "../../shared/middlewares/Validation";
import { IResposta } from "../../database/models/Respostas";
const prisma = new PrismaClient();

interface IBodyProps extends Omit<IResposta, "idResposta" | "resposta_pergunta" > {}

export const candidatoUpValidation = validation((getSchema) => ({
	body: getSchema<IBodyProps>(
		yup.object().shape({
			Resposta: yup.string().required().max(190)
		})
	),
}));

export const create = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
const { Resposta } = req.body;


try {
    const newQuestion = await prisma.respostas.create({
        data:{
            Resposta
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
