import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    url: { type: String, required: true },
    duration: Number,
  
});

const questionSchema = new mongoose.Schema({
    text: { type: String, required: true },
    choices: [String],
    correctAnswer: Number,
    explanation: String,

});

const chapterSchema = new mongoose.Schema({
    title: { type: String, required: true },
    videos: [videoSchema],
    questions: [questionSchema],
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
    order: Number,
}, { timestamps: true });

export const Chapter = mongoose.model('Chapter', chapterSchema);
