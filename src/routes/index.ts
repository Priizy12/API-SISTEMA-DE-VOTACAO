import  { Router } from 'express'
import { signUpValidation } from '../controllers/Usuarios/signup';
import { signInValidation } from '../controllers/Usuarios/signIn';
import { UsuariosController } from '../controllers/Usuarios';
import { Validation} from '../shared/middlewares/JwtValidation';
import { CandidatoController } from '../controllers/Candidatos';
import { multerConfig } from '../shared/config/multer';
import multer from 'multer';

const upload = multer(multerConfig);
const router = Router();

//Cadastro e Login
router.post('/cadastro', signUpValidation , UsuariosController.signUp)
router.post('/Login', signInValidation, UsuariosController.signIn)




//Cadastro de Candidatos
router.post("/Candidato" , upload.array("images"),  CandidatoController.create )


//Cadastro de Perguntas --> (Administrador)



export { router }