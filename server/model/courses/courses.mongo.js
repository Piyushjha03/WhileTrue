import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    courseID: {
        type: String,
        required: true,
        unique: true,
    },
    courseName: {
        type: String,
        required: true,
    },
    courseDescription: {
        type: String,
        required: true,
    },
    
});

const Courses = mongoose.model("Courses", courseSchema);
export default Courses;
