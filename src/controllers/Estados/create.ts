import { PrismaClient } from "@prisma/client";
import { RequestHandler, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { validation } from "../../shared/middlewares/Validation";
import { Estado } from "../../database/models/Estado";

const prisma = new PrismaClient();

interface IBodyProps extends Omit<Estado, "id_candidato" > {}

export const EstadoValidation = validation((getSchema) => ({
	body: getSchema<IBodyProps>(
		yup.object().shape({
			Estado: yup.string().required(),
            uf: yup.string().required().max(2).min(2),
		})
	),
}));

export const create = async (req: Request<{}, {}, Estado>, res: Response) => {

    const { Estado, uf } = req.body

        try {
            const estados = await prisma.estado.create({
                data:{
                    Estado,
                    uf
                }
            })

            return res.status(StatusCodes.OK).json({mensagem: "Estado criado com sucesso"})

        } catch (error) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    mensagem: "Erro na criação do Estado" + error
                })
        }
};


