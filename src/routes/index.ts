import  { Router } from 'express'
import { CandidatoController } from '../controllers/Candidatos';
import { multerConfig } from '../shared/config/multer';
import multer from 'multer';
import { signInValidation } from '../controllers/Pesquisadores/signIn';
import { PesquisadorController } from '../controllers/Pesquisadores';
import { signUpValidation } from '../controllers/Pesquisadores/signup';
import { candidatoUpValidation } from '../controllers/Candidatos/create';
import { candidatoValidation } from '../controllers/Candidatos/UpdateById';
import { EstadoController } from '../controllers/Estados';
import { MunicipioController } from '../controllers/Municipios';
import { VotacaoController } from '../controllers/votacao';


const router = Router();
const upload = multer(multerConfig) 

//Cadastro e Login --> ( Administrador )
router.post('/cadastro', signUpValidation, PesquisadorController.signUp )
router.post('/Login', signInValidation, PesquisadorController.signIn)




//Cadastro de Candidatos --> ( Administrador )
router.post("/Candidatos" , upload.array('images'),   candidatoUpValidation, CandidatoController.create )
router.get("/Candidatos", CandidatoController.getAll)
router.get("/Candidatos/:id", CandidatoController.getById)
router.put("/Candidatos/:id",  candidatoValidation ,CandidatoController.uptdate)
router.delete("/Candidatos/:id", CandidatoController.deleteById)

//Crud Estados
router.post("/Estado", EstadoController.create)
router.get("/Estados", EstadoController.getAll)


//Crud Municipios
router.post("/Municipio", MunicipioController.create)
router.get("/Municipios", MunicipioController.getAll)

//Votacao
router.post("/Votar", VotacaoController.create)
router.get("/Resultado", VotacaoController.getAll)
export { router }