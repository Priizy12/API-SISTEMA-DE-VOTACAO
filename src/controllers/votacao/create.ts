import { PrismaClient } from "@prisma/client";
import { RequestHandler, Request, Response } from "express";


const prisma = new PrismaClient();

interface votacao {
    candidatoId: number;
    Votos: string;
}


export const create = async (req: Request<{}, {}, votacao>, res: Response) => {

    const { candidatoId, Votos } = req.body

    try {
        const candidato = await prisma.candidato.findUnique({
            where: { id_candidato: candidatoId },
          });

          if (!candidato) {
            return res.status(404).json({ message: 'Candidato não encontrado' });
          }

          const votos = await prisma.votos.create({
            data:{
               Votar: true,
                candidatoId: candidato.id_candidato
            }
          })

          return res.status(201).json({ message: 'Voto registrado com sucesso' });
    } catch (error) {
        
        return res.status(500).json({ message: 'Erro ao registrar voto' });
        
    }

};


