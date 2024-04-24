import dotenv from "dotenv"
import {app} from "./app.js"
dotenv.config({})
import { uploadRouter } from "./routes/uploads.route.js"
import {paymentsRouter} from "./routes/payments.route.js"
import  doubtRouter  from "./routes/doubt.route.js"

 app.use('/api/v1/course',uploadRouter)
 app.use('/api/v1/payments',paymentsRouter)
app.use('/api/v1/',doubtRouter)


app.listen(process.env.PORT||8000,()=>{
    console.log(`Server running at port :${process.env.PORT}`)
})