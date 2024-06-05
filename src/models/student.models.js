import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const studentSchema = new mongoose.Schema({
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
    refreshToken:{
        type: String
    },


},{timestamps:true})

studentSchema.pre('save',async function(next){
    if(!this.isModified("password")) return next();
    else
    {
        this.password =await bcrypt.hash(this.password,10)
        next()
    }

})
studentSchema.methods.isPasswordCorrect = async function(password)
{
    return await bcrypt.compare(password,this.password)
}

studentSchema.methods.gnerateAccessToken = async function()
{
    return jwt.sign({
        _id: this._id,
        email:this.email,
        userName: this.userName
    },
    process.env.ACCESS_TOKEN_SECRET,
{
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY
})
}

studentSchema.methods.generateRefreshToken = function(){
         return jwt.sign({
            _id: this._id,
         },
         process.env.REFRESH_TOKEN_SECRET,
         {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
         }
        )
}




export const Student = mongoose.model("Student",studentSchema)