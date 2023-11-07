import { PrismaClient } from "@prisma/client";
import { RequestHandler, Request, Response } from "express";
import slug from 'slug'

const prisma = new PrismaClient();

interface votacao {
  nome: string;
  Idade: number;
  Localidade: string;
  candidatoId: number;
}


export const create = async (req: Request<{}, {}, votacao>, res: Response) => {

  const { candidatoId, nome, Idade, Localidade  } = req.body

  try {
    const candidato = await prisma.candidato.findUnique({
      where: {
        id_candidato: candidatoId
          }
    });

    if (!candidato) {
      return res.status(404).json({ message: 'Candidato não encontrado' });
    }

    const votos = await prisma.votos.create({
      data: {
        nome,
        Idade: Number(Idade),
        Localidade: slug(Localidade),
        Votar: true,
        candidatoId: candidato.id_candidato
      }
    })

    return res.status(201).json({ message: 'Voto registrado com sucesso' });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Erro ao registrar voto' });

  }

};


