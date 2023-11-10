import  { Router } from 'express'
import { CandidatoController } from '../controllers/Candidatos';
import { multerConfig } from '../shared/config/multer';
import multer from 'multer';
import { signInValidation } from '../controllers/Pesquisadores/signIn';
import { PesquisadorController } from '../controllers/Pesquisadores';
import { signUpValidation } from '../controllers/Pesquisadores/signup';
import { candidatoUpValidation } from '../controllers/Candidatos/create';
import { candidatoValidation } from '../controllers/Candidatos/UpdateById';
import { Validation } from '../shared/middlewares/JwtValidation'
import { VotacaoController } from '../controllers/votacao';
import { RolesController } from '../controllers/Roles';
import { PesquisadorValidation } from '../controllers/Pesquisadores/UpdateById';


const router = Router();
const upload = multer(multerConfig) 

//Cadastro de Pesquisdor --> ( Administrador )
router.post('/cadastro',  signUpValidation, PesquisadorController.signUp )
router.post('/Login', signInValidation, PesquisadorController.signIn)




//Cadastro de Candidatos --> ( Administrador )
router.post("/Candidatos" , upload.array('images'),  Validation , candidatoUpValidation, CandidatoController.create )
router.get("/Candidatos", Validation, CandidatoController.getAll)
router.get("/Candidatos/:id_candidato",  Validation , CandidatoController.getById)
router.put("/Candidatos/:id_candidato",  Validation , candidatoValidation ,CandidatoController.uptdate)
router.delete("/Candidatos/:id_candidato",  Validation , CandidatoController.deleteById)



//Pesquisador
router.post("/Votar",   Validation , VotacaoController.create)

//Administrador
router.get("/Resultado",  Validation , VotacaoController.getAll)



//Painel Administrativo
router.get("/Pesquisadores", Validation ,  PesquisadorController.getAll)
router.get("/Pesquisador/:id_Pesquisador",  Validation , PesquisadorController.getById)
router.put("/Pesquisador/:id_Pesquisador",  Validation , PesquisadorValidation , PesquisadorController.uptdate)
router.delete("/Pesquisador/:id_Pesquisador",  Validation , PesquisadorController.deleteById)


//Role
router.post("/Roles", RolesController.create)
export { router }