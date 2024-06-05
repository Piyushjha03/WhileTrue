import mongoose from "mongoose";

const educatorSchema = new mongoose.Schema({
    userName:{
        type: String,
        required: true,
        lowercase: true,
        index: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        unique: true
    },
    password:{
        type: String,
        required: [true,'Password is required']
    },
    avatar: {
        type: String,// cloudinary url
        required: true,
       
    },
},{timestamps:true})

export const Educator = mongoose.model('Educator',educatorSchema)