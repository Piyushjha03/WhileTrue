import express from "express";
import {
  httpAddWatchedCourse,
  httpGetWatchedCourse,
} from "../controller/watchedcourse.controller.js";

const watchedCourseRouter = express.Router();

watchedCourseRouter.post("/get", httpGetWatchedCourse);

watchedCourseRouter.post("/add", httpAddWatchedCourse);

export default watchedCourseRouter;
