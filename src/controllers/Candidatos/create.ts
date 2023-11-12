import { PrismaClient } from "@prisma/client";
import { RequestHandler, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { validation } from "../../shared/middlewares/Validation";
import { ICandidato } from "../../database/models/candidatos";
import axios from 'axios'
const prisma = new PrismaClient();

interface IBodyProps extends Omit<ICandidato, "id_candidato" | "estado" | 'bairro' | 'cidade' | 'logradouro' > {}

export const candidatoUpValidation = validation((getSchema) => ({
	body: getSchema<IBodyProps>(
		yup.object().shape({
			name: yup.string().required().min(5),
            apelido: yup.string().optional().max(60),
			Partido: yup.string().optional(),
			cep: yup.string().required().length(8)
		})
	),
}))


const getEnderecoByCep = async (cep: string) => {
	try {
	  const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
	  return response.data;
	} catch (error: any) {
	  console.error('Erro ao obter endereço por CEP:', error.message);
	  throw error;
	}
  };

export const create = async (req: Request<{}, {}, ICandidato>, res: Response) => {
	const { name, apelido, Partido, cep  } = req.body;
	const requestImages = req.files as Express.Multer.File[];
	try {

		const endereco = await getEnderecoByCep(cep);

			const images = requestImages.map((image) =>{
				return {
					Url: image.filename
				}
		});

		const candidato = await prisma.candidato.create({
			data: {
				name,
                apelido,
				Partido,
				logradouro: endereco.logradouro || '',
				cidade: endereco.cidade || '',
				estado: endereco.estado || '',
				bairro: endereco.bairro || '',
				images:{
					create: images
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


