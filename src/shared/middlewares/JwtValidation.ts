import { RequestHandler } from 'express'
import { StatusCodes } from 'http-status-codes'
import * as jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv';
import { env } from 'node:process';
dotenv.config();

interface TokenPayload {
    id: string;
    iat: number;
    exp: number; 
}

export const Validation: RequestHandler = (req, res, next) =>{
    const { authorization } = req.headers

    if (!authorization || authorization.split(' ').length !== 2) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ default: { error: { msg: "Não autenticado" } } })
    }

    if(!authorization) return res.status(StatusCodes.UNAUTHORIZED).json({default:{
        error:{
            msg:"Não autenticado"
        }
    }})

    const [, token] = authorization.split(' ').map(part => part.trim());


    if(!token) return res.status(StatusCodes.UNAUTHORIZED).json({default:{error:{msg: "Não autenticado"}}})

    try {
        const data = jwt.verify(token, 'dkajhfawhfaklsaf' || process.env.JWT_SECRET)
        const { id } = data as TokenPayload
        req.userId = id

        return next();
     } catch (e) {
        console.log(e)
        return res.status(StatusCodes.UNAUTHORIZED).json({default:{error:{msg: "Token invalido"}}})
    }
}