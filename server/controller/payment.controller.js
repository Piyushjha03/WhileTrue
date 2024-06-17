import { instance } from "../utils/Razorpay.utils.js";
import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config();
export const checkout = async (req, res) => {
  const val = req.body;
  const options = {
    amount: +val.amount * 100, // amount in the smallest currency unit
    currency: val.currency,
  };
  const order = await instance.orders.create(options).catch((err) => {
    console.log(err);
  });
  res.status(200).json(order);
};

export const paymentVerify = (req, res) => {
  console.log(req.body);

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const key_secret = process.env.RAZORPAY_API_SECRET;

  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", key_secret)
    .update(body.toString())
    .digest("hex");

  if (expectedSignature === razorpay_signature) {
    res.redirect(
      `http://localhost:5173/payment-success/?reference=${razorpay_payment_id}`
    );
  } else {
    res
      .status(400)
      .json({ status: "failure", message: "Payment verification failed" });
  }
};
