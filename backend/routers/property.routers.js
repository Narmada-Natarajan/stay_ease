import express from "express";
import { getProperties } from "../controllers/property.controllers.js";
import { addProperty } from "../controllers/addproperty.controllers.js";
import upload from "../middlewares/multer.middlewares.js";


const router = express.Router();

router.get("/all", getProperties);
router.post("/add",upload.single("image"),addProperty);

export default router;