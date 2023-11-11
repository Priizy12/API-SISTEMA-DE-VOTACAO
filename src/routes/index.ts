import  { Router } from 'express'
import { CandidatoController } from '../controllers/Candidatos';
import { multerConfig } from '../shared/config/multer';
import multer from 'multer';
import { signInValidation } from '../controllers/Pesquisadores/signIn';
import { PesquisadorController } from '../controllers/Pesquisadores';
import { signUpValidation } from '../controllers/Pesquisadores/signup';
import { candidatoUpValidation } from '../controllers/Candidatos/create';
import { candidatoValidation } from '../controllers/Candidatos/UpdateById';
import { AUTH } from '../shared/middlewares/JwtValidation';
import { VotacaoController } from '../controllers/votacao';
import { RolesController } from '../controllers/Roles';
import { PesquisadorValidation } from '../controllers/Pesquisadores/UpdateById';


const router = Router();
const upload = multer(multerConfig) 

//Cadastro de Pesquisdor --> ( Administrador )
router.post('/cadastro',  signUpValidation, PesquisadorController.signUp )
router.post('/Login', signInValidation, PesquisadorController.signIn)




//Cadastro de Candidatos --> ( Administrador )
router.post("/Candidatos" , upload.array('images'), AUTH, candidatoUpValidation, CandidatoController.create )
router.get("/Candidatos", AUTH, CandidatoController.getAll)
router.get("/Candidatos/:id_candidato",  AUTH , CandidatoController.getById)
router.put("/Candidatos/:id_candidato",  AUTH , candidatoValidation ,CandidatoController.uptdate)
router.delete("/Candidatos/:id_candidato",  AUTH , CandidatoController.deleteById)



//Pesquisador
router.post("/Votar", AUTH , VotacaoController.create)

//Administrador
router.get("/Resultado", AUTH , VotacaoController.getAll)



//Painel Administrativo
router.get("/Pesquisadores", AUTH ,  PesquisadorController.getAll)
router.get("/Pesquisador/:id_Pesquisador",  AUTH , PesquisadorController.getById)
router.put("/Pesquisador/:id_Pesquisador",  AUTH , PesquisadorValidation , PesquisadorController.uptdate)
router.delete("/Pesquisador/:id_Pesquisador",  AUTH , PesquisadorController.deleteById)


//Role
router.post("/Roles", AUTH ,RolesController.create)
export { router }