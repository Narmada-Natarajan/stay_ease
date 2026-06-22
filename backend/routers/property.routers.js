import express from "express";
import { getProperties, getPropertyById, getMyProperties} from "../controllers/property.controllers.js";
import { addProperty } from "../controllers/addproperty.controllers.js";
import upload from "../middlewares/multer.middlewares.js";
import { authMiddleware } from "../middlewares/auth.middlewares.js";


const router = express.Router();

router.get("/all", getProperties);
router.get( "/my-properties", authMiddleware, getMyProperties );
router.get("/:id", getPropertyById);
router.post(
  "/add",
  authMiddleware,
  upload.single("image"),
  addProperty
);

export default router;