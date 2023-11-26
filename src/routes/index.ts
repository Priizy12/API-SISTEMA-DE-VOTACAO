import  { Router } from 'express'
import { CandidatoController } from '../controllers/Candidatos';
import { multerConfig } from '../shared/config/multer';
import multer from 'multer';
import { signInValidation } from '../controllers/Pesquisadores/signIn';
import { PesquisadorController } from '../controllers/Pesquisadores';
import { signUpValidation } from '../controllers/Pesquisadores/signup';
import { candidatoUpValidation } from '../controllers/Candidatos/create';
import { candidatoValidation } from '../controllers/Candidatos/UpdateById';
import { Validation} from '../middlewares/JwtValidation';
import { VotacaoController } from '../controllers/votacao';
import { RolesController } from '../controllers/Roles';
import { PesquisadorValidation } from '../controllers/Pesquisadores/UpdateById';


const router = Router();
const upload = multer(multerConfig) 

//Cadastro de Pesquisdor --> ( Administrador )
router.post('/cadastro',  signUpValidation, PesquisadorController.signUp )
router.post('/Login', signInValidation, PesquisadorController.signIn)




//Cadastro de Candidatos --> ( Administrador )
router.post("/Candidatos" ,  upload.single("images"),  candidatoUpValidation, CandidatoController.create)
router.get("/Candidatos",  CandidatoController.getAll)
router.get("/Candidatos/:id_candidato",  CandidatoController.getById)
router.put("/Candidatos/:id_candidato",  candidatoValidation ,CandidatoController.uptdate)
router.delete("/Candidatos/:id_candidato",  CandidatoController.deleteById)




//Pesquisador
router.post("/Votar",VotacaoController.create)

//Administrador
router.get("/Resultado", VotacaoController.getAll)
router.get("/Votos", VotacaoController.getAllPorEstado)



//Painel Administrativo
router.get("/Pesquisadores",  PesquisadorController.getAll)
router.get("/Pesquisador/:id_Pesquisador",  PesquisadorController.getById)
router.put("/Pesquisador/:id_Pesquisador",  PesquisadorValidation , PesquisadorController.uptdate)
router.delete("/Pesquisador/:id_Pesquisador",  PesquisadorController.deleteById)


//Role
router.post("/Roles",RolesController.create)
export { router }