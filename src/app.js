import express from 'express'
import cors from 'cors'
import path from 'path'
import {engine} from 'express-handlebars'

const app = express()

app.engine('handlebars',engine({
    defaultLayout: 'main'
}))
app.set('view engine','handlebars')
app.set('views','../server/src/views')

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(express.static('../server/public'));

import { uploadRouter } from "./routes/uploads.route.js"
import {paymentsRouter} from "./routes/payments.route.js"
import  doubtRouter  from "./routes/doubt.route.js"

app.use('/api/v1/course',uploadRouter)
app.use('/api/v1/payments',paymentsRouter)
app.use('/api/v1/',doubtRouter)
app.get('/payments',(req,res)=>
{
       res.render('payment')
})

export {app}