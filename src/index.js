import dotenv from "dotenv"
import {app} from "./app.js"
import connectDB from "./db/index.js"
dotenv.config({})

connectDB()
.then(()=>{
    app.on("error",(error)=>{
        console.log("Error is:",error);
    })
})


app.listen(process.env.PORT||8000,()=>{
    console.log(`Server running at port :${process.env.PORT}`)
})