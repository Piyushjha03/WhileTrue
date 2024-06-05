import mongoose from "mongoose";
const courseSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    instructors:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Educator"
        
    }],
    chapters:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chapter"
    }],
    coverImage:{
        type: String,
        required:true
    },
    price:{
        type: Number,
        required: true
    },
    ratings:{
        type: Number,
        
    }
},{timestamps:true})


export const Course = mongoose.model('Course',courseSchema)