
import express from "express";
import {
  toggleWishlist,
  getWishlist,
} from "../controllers/wishlists.controllers.js";

import {authMiddleware} from "../middlewares/auth.middlewares.js";

const router = express.Router();

router.post(
  "/toggle",
  authMiddleware,
  toggleWishlist
);

router.get(
  "/all",
  authMiddleware,
  getWishlist
);

export default router;

