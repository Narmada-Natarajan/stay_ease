import express from "express";
import { userReg } from "../controllers/register.controllers.js";

const router = express.Router();

router.post("/register", userReg);

export default router;