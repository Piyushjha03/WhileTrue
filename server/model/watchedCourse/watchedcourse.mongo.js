import mongoose from "mongoose";

const watchedCourseSchema = new mongoose.Schema(
  {
    clerkID: {
      type: String,
      required: true,
    },
    courseID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    watched: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chapter",
        default: [],
      },
    ],
  },
  { timestamps: true }
);

export const WatchedCourse = mongoose.model(
  "WatchedCourse",
  watchedCourseSchema
);
