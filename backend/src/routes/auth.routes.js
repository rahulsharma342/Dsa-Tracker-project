import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getMe,
} from "../controllers/auth.controller.js";

import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();


// 🔐 Register User
// POST /api/auth/register
router.post("/register", registerUser);


// 🔐 Login User
// POST /api/auth/login
router.post("/login", loginUser);


// 🔐 Logout User
// POST /api/auth/logout
router.post("/logout", logoutUser);


// 👤 Get Current Logged-in User
// GET /api/auth/me
router.get("/get-me", protect, getMe);


export default router;