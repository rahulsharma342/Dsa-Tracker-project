import mongoose from "mongoose";

const problemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Problem title is required"],
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
    },

    link: {
      type: String,
      required: [true, "Problem link is required"],
    },

    platform: {
      type: String,
      enum: ["LeetCode", "GFG", "CodeStudio"],
      required: true,
    },

    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      required: true,
    },

    topic: {
      type: String,
      required: true, // Array, DP, Graph etc
    },

    tags: [
      {
        type: String, // e.g. sliding-window, two-pointer
      },
    ],

    // 🔥 Optional useful fields
    companyTags: [
      {
        type: String, // Amazon, Google etc
      },
    ],

    articleLink: {
      type: String, // solution blog
      default: "",
    },

    videoLink: {
      type: String, // YouTube solution
      default: "",
    },

    order: {
      type: Number, // sheet order (important for DSA sheet)
      default: 0,
    },

    // Stats (optional future use)
    totalSubmissions: {
      type: Number,
      default: 0,
    },

    totalSolved: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);


// 🔥 Index for faster search
problemSchema.index({ title: "text", tags: "text", topic: "text" });


// 🔥 Auto generate slug before save
problemSchema.pre("save", function (next) {
  if (!this.isModified("title")) return next();

  this.slug = this.title
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");

  next();
});


const Problem = mongoose.model("Problem", problemSchema);

export default Problem;