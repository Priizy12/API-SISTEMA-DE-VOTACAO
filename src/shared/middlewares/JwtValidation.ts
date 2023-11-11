import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import * as jwt from 'jsonwebtoken'

interface Payload {
    id: string;
    iat: number;
    exp: number;
}


export const AUTH = (req: Request<{}, {}, Payload>, res: Response, next: NextFunction) => {

    
    
    const bearer = req.headers.authorization

    if (!bearer) return res.status(StatusCodes.UNAUTHORIZED).json({
        default: {
            error: {
                msg: "Não autenticado"
            }
        }
    })

    const [, token] = bearer.split(' ').map(part => part.trim());


    if (!token) return res.status(StatusCodes.UNAUTHORIZED).json({ default: { error: { msg: "Não autenticado" } } })

    try {
        const data = jwt.verify(token, process.env.JWT_SECRET);
        const { id } = data as Payload
        req.userId = id

        return next();
    } catch (error) {
        console.log(error)
        return res.status(StatusCodes.UNAUTHORIZED).json({ default: { error: { msg: "Token invalido" } } })
    }
}