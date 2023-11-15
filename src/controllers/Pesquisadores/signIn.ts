import { PrismaClient } from "@prisma/client";
import { RequestHandler, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken'
import { IPesquisador } from "../../database/models";
import { validation } from '../../shared/middlewares/Validation';
import * as yup from 'yup'

const prisma = new PrismaClient()



interface IBodyProps extends Omit<IPesquisador, 'id_pesquisador' | 'name' | 'roleId' | 'cpf'> { }



export const signInValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        email: yup.string().required().email().min(5),
        senha: yup.string().required().min(6),
    })),
}));



export const signIn = async (req: Request<{}, {}, IPesquisador>, res: Response) => {
    const { email, senha } = req.body

    try {
        const user: {
            id_Pesquisador: number;
            email: string;
            name: string;
            cpf: string;
            senha: string;
            createdAt: Date;
            updatedAt: Date;
            roleId: number;
        } | null = await prisma.pesquisadores.findFirst({ where: { email } });


        if (!user) return res.status(StatusCodes.UNAUTHORIZED).json({
            default: {
                error: {
                    msg: "Email ou senha incorretos"
                }
            }
        });

        const verifyPass = await bcrypt.compare(senha, user.senha)

        if (!verifyPass) return res.status(StatusCodes.UNAUTHORIZED).json({
            default: {
                error: {
                    msg: "Email ou senha incorretos"
                }
            }
        });

        const token = jwt.sign({id: user.id_Pesquisador}, "secret", {
            expiresIn: "2d"
        })

        console.log('Token gerado:', token);

        return res.status(StatusCodes.OK).json({
            msg: "Logado com sucesso",
            acessToken: token

        })

    } catch (error) {
        console.log(error)
        return res.status(StatusCodes.UNAUTHORIZED).json({
            default: {
                error: {
                    msg: "Email ou senha incorretos"
                }
            }
        })
    }


}