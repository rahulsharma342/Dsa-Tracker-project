import mongoose from "mongoose";

const progressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    problem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Problem",
      required: true,
    },

    status: {
      type: String,
      enum: ["solved", "unsolved"],
      default: "unsolved",
    },

    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      required: true,
    },

    topic: {
      type: String,
      required: true,
    },

    // 🧠 Track attempts
    attempts: {
      type: Number,
      default: 0,
    },

    // ⏱️ Time spent (in minutes)
    timeSpent: {
      type: Number,
      default: 0,
    },

    // 🔁 Revision flag
    isRevision: {
      type: Boolean,
      default: false,
    },

    // 📅 Last attempted date
    lastAttemptedAt: {
      type: Date,
    },

    // 📅 Solved date
    solvedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);


// 🔥 Unique constraint (1 user + 1 problem = 1 progress)
progressSchema.index({ user: 1, problem: 1 }, { unique: true });


// 🔥 Index for fast filtering
progressSchema.index({ user: 1, topic: 1 });
progressSchema.index({ user: 1, difficulty: 1 });


const Progress = mongoose.model("Progress", progressSchema);

export default Progress;