import express from "express";
import { getProperties } from "../controllers/property.controllers.js";
import { addProperty } from "../controllers/addproperty.controllers.js";

const router = express.Router();

router.post("/all", getProperties);
router.post("/add",addProperty);

export default router;