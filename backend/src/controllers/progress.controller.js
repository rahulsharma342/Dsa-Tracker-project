import Progress from "../model/Progress.model.js";
import Problem from "../model/Problem.model.js";

// 📊 Get Full User Progress
export const getUserProgress = async (req, res) => {
  try {
    const progress = await Progress.find({ user: req.user._id }).populate(
      "problem",
    );

    res.status(200).json({
      success: true,
      count: progress.length,
      progress,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// 🔄 Update Progress (attempt / solve)
export const updateProgress = async (req, res) => {
  try {
    const { status, timeSpent } = req.body;
    const problemId = req.params.problemId;

    // get problem details
    const problem = await Problem.findById(problemId);
    if (!problem) {
      return res.status(404).json({
        success: false,
        message: "Problem not found",
      });
    }

    let progress = await Progress.findOne({
      user: req.user._id,
      problem: problemId,
    });

    if (!progress) {
      // create new progress
      progress = await Progress.create({
        user: req.user._id,
        problem: problemId,
        difficulty: problem.difficulty,
        topic: problem.topic,
        attempts: 1,
        timeSpent: timeSpent || 0,
        status: status || "unsolved",
        lastAttemptedAt: new Date(),
        solvedAt: status === "solved" ? new Date() : null,
      });
    } else {
      // update existing
      progress.attempts += 1;
      progress.timeSpent += timeSpent || 0;
      progress.lastAttemptedAt = new Date();

      if (status === "solved" && progress.status !== "solved") {
        progress.status = "solved";
        progress.solvedAt = new Date();
      }

      await progress.save();
    }

    res.status(200).json({
      success: true,
      progress,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// 📈 Dashboard Stats
export const getDashboardStats = async (req, res) => {
  try {
    const userId = req.user._id;

    const totalSolved = await Progress.countDocuments({
      user: userId,
      status: "solved",
    });

    const easy = await Progress.countDocuments({
      user: userId,
      status: "solved",
      difficulty: "Easy",
    });

    const medium = await Progress.countDocuments({
      user: userId,
      status: "solved",
      difficulty: "Medium",
    });

    const hard = await Progress.countDocuments({
      user: userId,
      status: "solved",
      difficulty: "Hard",
    });

    // 📅 Streak calculation
    const solvedDates = await Progress.find({
      user: userId,
      status: "solved",
    }).select("solvedAt");

    const uniqueDates = [
      ...new Set(solvedDates.map((p) => new Date(p.solvedAt).toDateString())),
    ];

    uniqueDates.sort((a, b) => new Date(b) - new Date(a));

    let streak = 0;
    let currentDate = new Date();

    for (let i = 0; i < uniqueDates.length; i++) {
      const date = new Date(uniqueDates[i]);

      if (date.toDateString() === currentDate.toDateString()) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        break;
      }
    }

    res.status(200).json({
      success: true,
      stats: {
        totalSolved,
        difficulty: {
          easy,
          medium,
          hard,
        },
        streak,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// 📚 Topic-wise Progress
export const getTopicWiseProgress = async (req, res) => {
  try {
    const userId = req.user._id;

    const data = await Progress.aggregate([
      {
        $match: {
          user: userId,
          status: "solved",
        },
      },
      {
        $group: {
          _id: "$topic",
          total: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      topics: data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// 📅 Daily Progress (Last 7 days)
export const getDailyProgress = async (req, res) => {
  try {
    const userId = req.user._id;

    const last7Days = new Date();
    last7Days.setDate(last7Days.getDate() - 7);

    const data = await Progress.aggregate([
      {
        $match: {
          user: userId,
          status: "solved",
          solvedAt: { $gte: last7Days },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$solvedAt",
            },
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    res.status(200).json({
      success: true,
      daily: data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
