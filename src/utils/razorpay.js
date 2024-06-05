import Razorpay from 'razorpay';

const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_ID,
    key_secret: process.env.RAZORPAY_SECRET_KEY
});

export { instance };
