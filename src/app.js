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

export {app}