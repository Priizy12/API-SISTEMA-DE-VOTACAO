import { PrismaClient } from "@prisma/client";
import { RequestHandler, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { validation } from "../../shared/middlewares/Validation";
import { ICandidato } from "../../database/models/candidatos";
const prisma = new PrismaClient();

interface IBodyProps extends Omit<ICandidato, "idCandidato" | 'foto'> {}

export const candidatoUpValidation = validation((getSchema) => ({
	body: getSchema<IBodyProps>(
		yup.object().shape({
			name: yup.string().required().min(3),
            municipio: yup.string().required().max(60),
            apelido: yup.string().optional().max(60),
		})
	),
}));

export const create = async (req: Request<{}, {}, ICandidato>, res: Response) => {
	const { name, municipio, apelido, foto } = req.body;

	try {
		const user = await prisma.candidato.create({
			data: {
				name,
				municipio,
                apelido,
                foto
			},
		});

		return res.status(StatusCodes.OK).json({
			msg: "Candidato Registrado com sucesso",
			user,
		});
	} catch (error) {
		return res.status(StatusCodes.UNAUTHORIZED).json({
			default: {
				error: {
					msg: "Candidato não foi registrado, revise os campos e preencha corretamente.",
				},
			},
		});
	}
};