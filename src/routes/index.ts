import  { Router } from 'express'
import { Validation} from '../shared/middlewares/JwtValidation';
import { CandidatoController } from '../controllers/Candidatos';
import { multerConfig } from '../shared/config/multer';
import multer from 'multer';
import { signInValidation } from '../controllers/Pesquisadores/signIn';
import { PesquisadorController } from '../controllers/Pesquisadores';
import { signUpValidation } from '../controllers/Pesquisadores/signup';
import { candidatoUpValidation } from '../controllers/Candidatos/create';
import { candidatoValidation } from '../controllers/Candidatos/UpdateById';


const router = Router();

//Cadastro e Login --> ( Administrador )
router.post('/cadastro', signUpValidation, PesquisadorController.signUp )
router.post('/Login', signInValidation, PesquisadorController.signIn)




//Cadastro de Candidatos --> ( Administrador )
router.post("/Candidatos" , multer(multerConfig).single('images'),   candidatoUpValidation, CandidatoController.create )
router.get("Candidatos", CandidatoController.getAll)
router.get("/Candidatos/:id", CandidatoController.getById)
router.put("Candidatos/:id",  candidatoValidation ,CandidatoController.uptdate)
router.delete("Candidatos/:id", CandidatoController.deleteById)





export { router }