import express from "express";
import { userReg} from "../controllers/register.controllers.js";
import { userLogin } from "../controllers/login.controllers.js";

const router = express.Router();

router.post("/register", userReg);
router.post("/login",userLogin);

export default router;