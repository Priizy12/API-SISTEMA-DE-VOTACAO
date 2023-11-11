import { NextFunction, Request, RequestHandler, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import * as jwt from 'jsonwebtoken'


interface Payload {
    id: string;
    iat: number;
    exp: number;
}


export const AUTH: RequestHandler = (req, res, next) => {

    const {authorization} = req.headers;

    if(!authorization) return res.status(StatusCodes.UNAUTHORIZED).json({message: "não autenticado"})

        try {
            const [,token] = authorization.split(' ')
            if(!token) return res.status(StatusCodes.UNAUTHORIZED).json({message: "não autenticado"})
            
            const data = jwt.verify(token, process.env.JWT_SECRET)
            const { id } = data as Payload
            req.userId = id

            return next()
        } catch (error) {
            console.log(error)
            return res.status(StatusCodes.UNAUTHORIZED).json({message: "Token Invalido"})
        }
}