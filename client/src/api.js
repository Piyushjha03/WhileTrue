import { useUser } from "@clerk/clerk-react";
import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

export const checkOutPayment = async ({ amount, currency }) => {
  const { userId } = useUser();
  const {
    data: { key },
  } = await api.get("/payment/key");

  const { data } = await api.post("/payment/checkout", {
    amount,
    currency,
  });
  console.log("====================================");
  console.log(data);
  console.log("====================================");
  const options = {
    key,
    amount: data.amount,
    currency: "INR",
    name: "While True",
    description: "Course Purchase",
    image: "../../public/favicon.png",
    order_id: data.id,
    callback_url: `http://localhost:8000/payment/verification/?clerkId=${userId}`,
    prefill: {
      name: "",
      email: "",
      contact: "",
    },
    notes: {
      address: "Razorpay Payment to While True",
    },
    theme: {
      color: "#854cff",
    },
  };
  const rzp1 = window.Razorpay(options);
  rzp1.open();
};
