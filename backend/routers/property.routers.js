import express from "express";
import { getProperties, getPropertyById, getMyProperties} from "../controllers/property.controllers.js";
import { addProperty,deleteProperty,editProperty } from "../controllers/addproperty.controllers.js";
import upload from "../middlewares/multer.middlewares.js";
import { authMiddleware } from "../middlewares/auth.middlewares.js";


const router = express.Router();

router.get("/all", getProperties);
router.get( "/my-properties", authMiddleware, getMyProperties );
router.get("/:id", getPropertyById);
router.post(
  "/add",
  authMiddleware,
  upload.array("images"),
  addProperty
);

router.put(
  "/edit/:id",
  authMiddleware,
  editProperty
);

router.delete(
    "/delete/:id",
    authMiddleware,
    deleteProperty
);

export default router;