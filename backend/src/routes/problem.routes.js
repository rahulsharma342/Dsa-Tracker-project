import express from "express";
import {
  getAllProblems,
  getSingleProblem,
  createProblem,
  updateProblem,
  deleteProblem,
  markProblemSolved,
  toggleBookmark,
  addToRevision,
} from "../controllers/problem.controller.js";

import { protect, isAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();


// 📚 Get All Problems (with filters)
// GET /api/problems
router.get("/", protect, getAllProblems);


// 🔍 Get Single Problem
// GET /api/problems/:id
router.get("/:id", protect, getSingleProblem);


// ➕ Create Problem (Admin Only)
// POST /api/problems
router.post("/", protect, isAdmin, createProblem);


// ✏️ Update Problem (Admin Only)
// PUT /api/problems/:id
router.put("/:id", protect, isAdmin, updateProblem);


// ❌ Delete Problem (Admin Only)
// DELETE /api/problems/:id
router.delete("/:id", protect, isAdmin, deleteProblem);


// ✅ Mark Problem as Solved
// POST /api/problems/:id/solve
router.post("/:id/solve", protect, markProblemSolved);


// ⭐ Bookmark / Unbookmark
// POST /api/problems/:id/bookmark
router.post("/:id/bookmark", protect, toggleBookmark);


// 🔁 Add to Revision
// POST /api/problems/:id/revision
router.post("/:id/revision", protect, addToRevision);


export default router;