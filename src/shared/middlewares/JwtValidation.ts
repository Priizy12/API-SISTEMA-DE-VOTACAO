import { RequestHandler } from 'express'
import { StatusCodes } from 'http-status-codes'
import * as jwt from 'jsonwebtoken'

interface TokenPayload {
    id: string;
    iat: number;
    exp: number;
}

export const Validation: RequestHandler = (req, res, next) => {
    const { authorization } = req.headers

    if (!authorization) return res.status(StatusCodes.UNAUTHORIZED).json({
        default: {
            error: {
                msg: "Não autenticado"
            }
        }
    })

    const [ ,token] = authorization.split(' ')


    if (!token) return res.status(StatusCodes.UNAUTHORIZED).json({ default: { error: { msg: "Não autenticado" } } })

    try {

        const data = jwt.verify(token, process.env.JWT_SECRET);
        const { id } = data as TokenPayload
        req.userId = id

        return next();
    } catch (error) {
        console.log(error)
        return res.status(StatusCodes.UNAUTHORIZED).json({ default: { error: { msg: "Token invalido" } } })
    }
}