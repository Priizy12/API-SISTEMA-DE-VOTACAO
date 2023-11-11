import { RequestHandler } from 'express'
import { StatusCodes } from 'http-status-codes'
import * as jwt from 'jsonwebtoken'

interface TokenPayload {
    id: string;
    iat: number;
    exp: number;
}



export const AUTH: RequestHandler = (req, res, next) => {

    const authjwt = jwt.verify

    const { authorization } = req.headers

    if (!authorization) return res.status(StatusCodes.UNAUTHORIZED).json({
        default: {
            error: {
                msg: "Não autenticado"
            }
        }
    })

    const [, token] = authorization.replace(/Bearer\s/, ' ').trim();



    if (!token) return res.status(StatusCodes.UNAUTHORIZED).json({ default: { error: { msg: "Não autenticado" } } })

    try {
        const data = authjwt(token, process.env.JWT_SECRET);
        const { id } = data as TokenPayload
        req.userId = id

        return next();
    } catch (error) {
        console.log(error)
        return res.status(StatusCodes.UNAUTHORIZED).json({ default: { error: { msg: "Token invalido" } } })
    }
}