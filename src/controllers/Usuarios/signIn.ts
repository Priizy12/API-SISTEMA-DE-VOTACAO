import { PrismaClient } from "@prisma/client";
import { RequestHandler, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken'
import { IUsuario } from "../../database/models";
import { validation } from '../../shared/middlewares/Validation';
import * as yup from 'yup'
const prisma = new PrismaClient()



interface IBodyProps extends Omit<IUsuario, 'id' | 'name' |  'roleId' | 'cpf'> {  }



export const signInValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
      email: yup.string().required().email().min(5),
      senha: yup.string().required().min(6),
    })),
  }));



export const signIn = async (req: Request<{}, {}, IBodyProps>, res: Response) =>{
    const {email, senha} = req.body
  
  try {
    const user: { id: number; email: string; name: string; senha: string } | null   = await prisma.user.findFirst({ where: { email } });

    if(!user) return res.status(StatusCodes.UNAUTHORIZED).json({
        default:{
            error:{
                msg: "Email ou senha incorretos"
            }
        }
    });

    const verifyPass = await bcrypt.compare(senha, user.senha)

    if(!verifyPass) return res.status(StatusCodes.UNAUTHORIZED).json({
        default:{
            error:{
                msg: "Email ou senha incorretos"
            }
        }
    });
    
   const token =  jwt.sign({id: user.id}, 'wNx3UP8NQiX3hQv2dBDnaf3rj4rgA71hR' , {
        expiresIn: "24h"
    } )

    return res.status(StatusCodes.OK).json({
       msg: "Logado com sucesso",
       acessToken: token

    })
    
  } catch (error) {
  console.log(error)
    return res.status(StatusCodes.UNAUTHORIZED).json({
        default:{
            error:{
                msg: "Email ou senha incorretos"
            }
        }
    })
  }


}