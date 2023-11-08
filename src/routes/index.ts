import  { Router } from 'express'
import { CandidatoController } from '../controllers/Candidatos';
import { multerConfig } from '../shared/config/multer';
import multer from 'multer';
import { signInValidation } from '../controllers/Pesquisadores/signIn';
import { PesquisadorController } from '../controllers/Pesquisadores';
import { signUpValidation } from '../controllers/Pesquisadores/signup';
import { candidatoUpValidation } from '../controllers/Candidatos/create';
import { candidatoValidation } from '../controllers/Candidatos/UpdateById';

import { VotacaoController } from '../controllers/votacao';
import { RolesController } from '../controllers/Roles';


const router = Router();
const upload = multer(multerConfig) 

//Cadastro e Login --> ( Administrador )
router.post('/cadastro', signUpValidation, PesquisadorController.signUp )
router.post('/Login', signInValidation, PesquisadorController.signIn)




//Cadastro de Candidatos --> ( Administrador )
router.post("/Candidatos" , upload.array('images'),   candidatoUpValidation, CandidatoController.create )
router.get("/Candidatos", CandidatoController.getAll)
router.get("/Candidatos/:id_candidato", CandidatoController.getById)
router.put("/Candidatos/:id_candidato",  candidatoValidation ,CandidatoController.uptdate)
router.delete("/Candidatos/:id_candidato", CandidatoController.deleteById)



//Pesquisador
router.post("/Votar", VotacaoController.create)

//Administrador
router.get("/Resultado", VotacaoController.getAll)








//Role
router.post("/Roles", RolesController.create)
export { router }