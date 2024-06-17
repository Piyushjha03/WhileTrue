import express from "express";
import { checkout, paymentVerify } from "../controller/payment.controller.js";
import dotenv from "dotenv";
dotenv.config();

const paymentRouter = express.Router();

paymentRouter.post("/checkout", checkout);

paymentRouter.post("/verification", paymentVerify);

paymentRouter.get("/key", (req, res) => {
  res.status(200).json({ key: process.env.RAZORPAY_API_KEY });
});

export default paymentRouter;
