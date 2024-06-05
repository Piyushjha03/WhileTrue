
import { instance } from '../utils/razorpay.js';
import crypto from 'crypto';


export const createOrder = async (req, res) => {
    const { amount, currency } = req.body;

    const options = {
        amount: amount * 100, 
        currency: currency,
    };

    try {
        const order = await instance.orders.create(options);
        console.log(order)
        res.json({order:order});
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};


export const verifyPayment = (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const key_secret = process.env.RAZORPAY_SECRET_KEY;
    
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
        .createHmac('sha256', key_secret)
        .update(body.toString())
        .digest('hex');

    if (expectedSignature === razorpay_signature) {
        res.json({ status: 'success', message: 'Payment verified successfully' });
    } else {
        res.status(400).json({ status: 'failure', message: 'Payment verification failed' });
    }
};


export const capturePayment = async (req, res) => {
    const { payment_id, amount } = req.body;

    try {
        const payment = await instance.payments.capture(payment_id, amount * 100); 
        res.json(payment);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
};
