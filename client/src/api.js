import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

export const checkOutPayment = async ({ amount, currency, id, courseID }) => {
  const {
    data: { key },
  } = await api.get("/payment/key");

  const { data } = await api.post("/payment/checkout", {
    amount,
    currency,
  });

  const options = {
    key,
    amount: data.amount,
    currency: "INR",
    name: "While True",
    description: "Course Purchase",
    image: "../../public/favicon.png",
    order_id: data.id,
    callback_url: `http://localhost:8000/payment/verification/?id=${id}&courseID=${courseID}`,
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

export const getuserinfo = async (userID) => {
  const { data } = await api.post("/user/getinfo", { clerkID: userID });
  return data;
};

export const getAllCourses = async () => {
  const { data } = await api.get("/course/getall");
  return data;
};

export const getCourseInfo = async (courseID) => {
  const { data } = await api.get(`/course/getCourseInfo/?id=${courseID}`);
  return data;
};

export const getIsWatched = async ({ clerkID, courseID }) => {
  const { data } = await api.post("/iswatched/get", { clerkID, courseID });

  return data;
};

export const postIsWatched = async ({ clerkID, courseID, watched }) => {
  const { data } = await api.post("/isWatched/add", {
    clerkID,
    courseID,
    watched,
  });
  return data;
};

export const updateIsWatched = async ({ clerkID, courseID, watched }) => {
  const { data } = await api.post("/isWatched/update", {
    clerkID,
    courseID,
    watched,
  });
  return data;
};
