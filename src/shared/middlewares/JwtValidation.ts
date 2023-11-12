import { NextFunction, Request, RequestHandler, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as jwt from 'jsonwebtoken';

interface Payload {
    id: string;
    iat: number;
    exp: number;
}

export const AUTH: RequestHandler = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Não autenticado" });
    }

    const [bearer, token] = authorization.split(' ');

    if (bearer !== 'Bearer' || !token) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Formato de token inválido" });
    }

    try {
        // Imprimir o token para fins de depuração
        console.log('Token recebido:', token);

        // Verificar o token usando a biblioteca JWT
        const data =  jwt.verify(token, 'teste_Secret'); 
        const { id } = data as Payload;
        req.userId = id;
        return next();
    } catch (error) {
        console.error(error);
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Token inválido" });
    }
};
