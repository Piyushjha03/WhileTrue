import express from 'express'
const router = express.Router()
import { addNewCard, customerData } from '../controllers/createcutomer.controller.js'

router.post('/customer',customerData)
router.post('/add-card',addNewCard)

export const paymentsRouter = router