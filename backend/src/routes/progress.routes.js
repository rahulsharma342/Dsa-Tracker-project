import express from "express";
import {
  getUserProgress,
  getDashboardStats,
  updateProgress,
  getTopicWiseProgress,
  getDailyProgress,
} from "../controllers/progress.controller.js";

import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();


// 📊 Get full user progress
// GET /api/progress
router.get("/", protect, getUserProgress);


// 📈 Dashboard stats (main analytics)
// GET /api/progress/stats
router.get("/stats", protect, getDashboardStats);


// 🔄 Update progress (attempts, time, status)
// POST /api/progress/:problemId
router.post("/:problemId", protect, updateProgress);


// 📚 Topic-wise progress
// GET /api/progress/topics
router.get("/topics", protect, getTopicWiseProgress);


// 📅 Daily progress (for charts)
// GET /api/progress/daily
router.get("/daily", protect, getDailyProgress);


export default router;