import express from 'express'
const router = express.Router()
import { createOrder,capturePayment,verifyPayment } from '../controllers/payments.controller.js'
router.post('/createorder',createOrder)
router.post('/payment',capturePayment)
router.post('/verifypayment',verifyPayment)

export const paymentsRouter = router

