import axios from "axios";

export const api = axios.create({
  baseURL:
    import.meta.env.VITE_ENV === "development"
      ? import.meta.env.VITE_DEV_BACKEND_URL
      : import.meta.env.VITE_PROD_BACKEND_URL,
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

  const callbackurl =
    import.meta.env.VITE_ENV === "development"
      ? import.meta.env.VITE_DEV_FRONTEND_URL
      : import.meta.env.VITE_PROD_FRONTEND_URL;

  const options = {
    key,
    amount: data.amount,
    currency: "INR",
    name: "While True",
    description: "Course Purchase",
    image: "../../public/favicon.png",
    order_id: data.id,
    callback_url: `${callbackurl}/dashboard`,
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

export const askDoubt = async ({ query, videoID }) => {
  const { data } = await api.post("/doubts/query", {
    query: query,
    videoID: videoID,
  });
  return data;
};

export const addCourse = async (course) => {
  const { data } = await api.post("/course/create", course);
  return data;
};

export const addChapter = async (chapter) => {
  const { data } = await api.post("/chapters/add", chapter);
  return data;
};

export const updateChapter = async (chapter) => {
  const { data } = await api.post("/chapters/update", chapter);
  return data;
};

// for multipart form data
export const apifile = axios.create({
  baseURL:
    import.meta.env.VITE_ENV === "development"
      ? import.meta.env.VITE_DEV_BACKEND_URL
      : import.meta.env.VITE_PROD_BACKEND_URL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

export const uploadVideo = async (formData) => {
  const { data } = await apifile.post("/chapters/video", formData);
  return data;
};
