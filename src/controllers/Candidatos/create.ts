import { PrismaClient } from "@prisma/client";
import { RequestHandler, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { validation } from "../../shared/middlewares/Validation";
import { ICandidato } from "../../database/models/candidatos";
const prisma = new PrismaClient();

interface IBodyProps extends Omit<ICandidato, "id_candidato" > {}

export const candidatoUpValidation = validation((getSchema) => ({
	body: getSchema<IBodyProps>(
		yup.object().shape({
			name: yup.string().required().min(5),
            apelido: yup.string().optional().max(60),
		})
	),
}));

export const create = async (req: Request<{}, {}, ICandidato>, res: Response) => {
	const { name, apelido } = req.body;
	//const requestImages = req.files as Express.Multer.File[];
	try {

			//const images = requestImages.map((image) =>{
			//	return {
			//		Url: image.filename
			//	}
		//	});


		const candidato = await prisma.candidato.create({
			data: {
				name,
                apelido,
				images:{
				//	create: images
				}
			}
		});
	
		return res.status(StatusCodes.OK).json({
			msg: "Candidato Registrado com sucesso",
			candidato,
		});
	} catch (error) {
		console.log(error)
		return res.status(StatusCodes.UNAUTHORIZED).json({
			default: {
				error: {
					msg: "Candidato não foi registrado, revise os campos e preencha corretamente.",
				},
			},
		});
	}
};


