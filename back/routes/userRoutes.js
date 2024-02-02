import express from "express";
import { createNewUser , getUsuarios} from "../src/controllers/usersController.js";
import { loginUser } from "../src/controllers/loginController.js";
import { isLogin } from "../src/middlewares/isLogin.js";
/* import {validateParametersUser } from "../../middlewares/validateParamsUser.js"; */


const router = express.Router();

router.post("/usuarios",  createNewUser)
router.post("/login",  loginUser)
router.get("/usuarios",isLogin,  getUsuarios)

export default router;