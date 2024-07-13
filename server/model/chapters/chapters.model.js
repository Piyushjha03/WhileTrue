import mongoose from "mongoose";

const chapterSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    courseID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
    videoLink: {
      type: String,
    },
    transcript: {
      type: String,
    },
    videoStatus: {
      type: String,
      enum: ["N/A", "queued", "cancelled", "uploaded"],
      default: "N/A",
    },
  },
  { timestamps: true }
);

export const Chapter = mongoose.model("Chapter", chapterSchema);
