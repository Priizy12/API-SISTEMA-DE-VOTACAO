import { PrismaClient } from "@prisma/client";
import { RequestHandler, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as bcrypt from "bcryptjs";
import * as yup from "yup";
import { IPesquisador  } from "../../database/models";
import { validation } from "../../shared/middlewares/Validation";
const prisma = new PrismaClient();

interface IBodyProps extends Omit<IPesquisador, "id_pesquisador" | "roleId"> {}

export const signUpValidation = validation((getSchema) => ({
	body: getSchema<IBodyProps>(
		yup.object().shape({
			name: yup.string().required().min(3),
			senha: yup.string().required().min(6),
			email: yup.string().required().email().min(5),
			cpf: yup.string().required().min(11).max(11),
		})
	),
}));

export const signUp = async (req: Request<{}, {}, IPesquisador>, res: Response) => {
	const { name, email, senha, cpf, roleId } = req.body;

	const userExist = await prisma.pesquisadores.findUnique({ where: { email } });
	if (userExist)
		return res.status(StatusCodes.UNAUTHORIZED).json({
			msg: "Email já registrado!",
		});

	try {
		const hashPassword = await bcrypt.hash(senha, 10);
		const userRole = roleId || 1;
		const user = await prisma.pesquisadores.create({
			data: {
				name,
				email,
				senha: hashPassword,
				cpf,
				roleId: userRole,
			},
		});

		return res.status(StatusCodes.OK).json({
			msg: "Usuario criado com sucesso",
			user,
		});
	} catch (error) {
		return res.status(StatusCodes.UNAUTHORIZED).json({
			default: {
				error: {
					msg: "Usuario não cadastrado, revise os campos e preencha corretamente.",
				},
			},
		});
	}
};