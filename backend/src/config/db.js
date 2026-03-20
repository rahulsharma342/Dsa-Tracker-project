import mongoose from "mongoose";
import dsaSheet from "../data/dsasheet.js";
import Problem from "../model/Problem.model.js";

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully");

    const problemCount = await Problem.estimatedDocumentCount();
    if (problemCount === 0) {
      const seedProblems = dsaSheet.map((problem) => ({
        ...problem,
        slug: (problem.title || "")
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^\w-]+/g, ""),
      }));

      await Problem.insertMany(seedProblems);
      console.log("DSA Sheet Imported");
    }
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1); // Exit the process with failure
  }
}

export default connectDB;
