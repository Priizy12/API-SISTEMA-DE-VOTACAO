import { PrismaClient, municipio } from "@prisma/client";
import {  Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { validation } from "../../shared/middlewares/Validation";
import { Municipio } from '../../database/models/municipios';

const prisma = new PrismaClient();

interface IBodyProps extends Omit<Municipio, 'idMunicipio'> {}

export const EstadoValidation = validation((getSchema) => ({
	body: getSchema<IBodyProps>(
		yup.object().shape({
			Municipio: yup.string().required()
		})
	),
}));

export const create = async (req: Request<{}, {}, Municipio>, res: Response) => {

    const  { Municipio }  = req.body

        try {
            const estados = await prisma.municipio.create({
                data:{
                    Municipio 
                }
            })

            return res.status(StatusCodes.OK).json({mensagem: "Municipio criado com sucesso"})

        } catch (error) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    mensagem: "Erro na criação do Municipio" + error
                })
        }
};


