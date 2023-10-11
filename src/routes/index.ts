import  { Router } from 'express'
import { signUpValidation } from '../controllers/Usuarios/signup';
import { signInValidation } from '../controllers/Usuarios/signIn';
import { UsuariosController } from '../controllers/Usuarios';
import { Validation} from '../shared/middlewares/JwtValidation';
import { CandidatoController } from '../controllers/Candidatos';



const router = Router();

//Cadastro e Login
router.post('/cadastro', signUpValidation , UsuariosController.signUp)
router.post('/Login', signInValidation, UsuariosController.signIn)




//Cadastro de Candidatos
router.post("/Candidato" , Validation, CandidatoController.create )

export { router }