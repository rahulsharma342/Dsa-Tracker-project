import Problem from "../model/Problem.model.js";
import Progress from "../model/Progress.model.js";
import User from "../model/User.model.js";

// 📚 Get All Problems (with filters)
export const getAllProblems = async (req, res) => {
  try {
    const { topic, difficulty, search } = req.query;

    let query = {};

    if (topic) query.topic = topic;
    if (difficulty) query.difficulty = difficulty;

    if (search) {
      query.$text = { $search: search };
    }

    const problems = await Problem.find(query).sort({ order: 1 });

    res.status(200).json({
      success: true,
      count: problems.length,
      problems,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// 🔍 Get Single Problem
export const getSingleProblem = async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id);

    if (!problem) {
      return res.status(404).json({
        success: false,
        message: "Problem not found",
      });
    }

    res.status(200).json({
      success: true,
      problem,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ➕ Create Problem (Admin)
export const createProblem = async (req, res) => {
  try {
    const problem = await Problem.create(req.body);

    res.status(201).json({
      success: true,
      problem,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ✏️ Update Problem (Admin)
export const updateProblem = async (req, res) => {
  try {
    let problem = await Problem.findById(req.params.id);

    if (!problem) {
      return res.status(404).json({
        success: false,
        message: "Problem not found",
      });
    }

    problem = await Problem.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: "after",
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      problem,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ❌ Delete Problem (Admin)
export const deleteProblem = async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id);

    if (!problem) {
      return res.status(404).json({
        success: false,
        message: "Problem not found",
      });
    }

    await problem.deleteOne();

    res.status(200).json({
      success: true,
      message: "Problem deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ✅ Mark Problem as Solved
export const markProblemSolved = async (req, res) => {
  try {
    const userId = req.user._id;
    const problemId = req.params.id;

    // 🔍 Check problem exists
    const problem = await Problem.findById(problemId);
    if (!problem) {
      return res.status(404).json({
        success: false,
        message: "Problem not found",
      });
    }

    // 👤 Get user
    const user = await User.findById(userId);

    // ✅ Check already solved
    const alreadySolved = user.solvedProblems.some(
      (id) => id.toString() === problemId
    );

    let progress;

    if (alreadySolved) {
      // ❌ UNSOLVE (remove from user)
      user.solvedProblems = user.solvedProblems.filter(
        (id) => id.toString() !== problemId
      );

      user.totalSolved = Math.max(0, user.totalSolved - 1);

      // ❌ Remove from Progress collection
      await Progress.deleteOne({ user: userId, problem: problemId });

      progress = null;
    } else {
      // ✅ SOLVE (add to user)
      user.solvedProblems.push(problemId);
      user.totalSolved += 1;

      // 🔥 Streak Logic
      const today = new Date().toDateString();
      const lastDate = user.lastSolvedDate
        ? new Date(user.lastSolvedDate).toDateString()
        : null;

      if (lastDate !== today) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        if (lastDate === yesterday.toDateString()) {
          user.streak += 1;
        } else {
          user.streak = 1;
        }

        user.lastSolvedDate = new Date();
      }

      // ✅ Create / Update Progress
      progress = await Progress.findOneAndUpdate(
        { user: userId, problem: problemId },
        {
          $set: {
            status: "solved",
            difficulty: problem.difficulty,
            topic: problem.topic,
            solvedAt: new Date(),
            lastAttemptedAt: new Date(),
          },
          $inc: { attempts: 1 },
        },
        {
          upsert: true,
          returnDocument: "after",
          setDefaultsOnInsert: true,
        }
      );
    }

    // 💾 Save user
    await user.save();

    // 📤 Response
    res.status(200).json({
      success: true,
      message: alreadySolved
        ? "Problem marked as unsolved"
        : "Problem marked as solved",
      solved: !alreadySolved, // 🔥 frontend ke liye important
      progress,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ⭐ Bookmark / Unbookmark
export const toggleBookmark = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const problemId = req.params.id;

    const index = user.bookmarkedProblems.indexOf(problemId);

    if (index === -1) {
      user.bookmarkedProblems.push(problemId);
      await user.save();

      return res.status(200).json({
        success: true,
        message: "Bookmarked",
      });
    } else {
      user.bookmarkedProblems.splice(index, 1);
      await user.save();

      return res.status(200).json({
        success: true,
        message: "Bookmark removed",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// 🔁 Add to Revision
export const addToRevision = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const problemId = req.params.id;

    if (!user.revisionProblems.includes(problemId)) {
      user.revisionProblems.push(problemId);
      await user.save();

      return res.status(200).json({
        success: true,
        message: "Added to revision",
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "Already in revision list",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
