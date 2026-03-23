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

      // Keep the first item for each slug so duplicate titles in seed data don't crash startup.
      const uniqueSeedProblems = Array.from(
        new Map(
          seedProblems.map((problem) => [problem.slug, problem]),
        ).values(),
      );

      if (uniqueSeedProblems.length !== seedProblems.length) {
        console.warn(
          `Skipped ${seedProblems.length - uniqueSeedProblems.length} duplicate problem slug(s) while seeding`,
        );
      }

      await Problem.insertMany(uniqueSeedProblems);
      console.log("DSA Sheet Imported");
    }
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1); // Exit the process with failure
  }
}

export default connectDB;
