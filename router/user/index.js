import { Router } from "express";
import { comprobarTokenExp, generarToken, setAddUser } from "../../controllers/user.js";
import { authValidation, authValidationSignUp } from "../../utils/auth.js";

export const routerUser = Router();

routerUser.post("/verf",comprobarTokenExp)
routerUser.post("/",authValidation,generarToken)

routerUser.post("/signUp",authValidationSignUp,setAddUser)
