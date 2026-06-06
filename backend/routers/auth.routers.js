import express from "express";
import { userReg} from "../controllers/register.controllers.js";
import { userLogin } from "../controllers/login.controllers.js";
import {authMiddleware} from "../middlewares/auth.middlewares.js";

const router = express.Router();

router.post("/register", userReg);
router.post("/login",userLogin);
router.get("/me", authMiddleware, (req, res) => {

  return res.status(200).json({
    verified: true,
    
  });
});

export default router;