import express from "express";

import {
  register,
  verifyEmail,
  login,
  logout,
} from "../controllers/authController.js";
import authentication from "../middlewares/authentication.js";

const router = express.Router();

router.post("/register", register);
router.post("/verify-email", verifyEmail);
router.post("/login", login);
router.delete("/logout", authentication, logout);

export default router;
