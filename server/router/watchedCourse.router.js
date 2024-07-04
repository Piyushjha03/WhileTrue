import express from "express";
import {
  httpAddWatchedCourse,
  httpGetWatchedCourse,
  httpUpdateWatchedCourse,
} from "../controller/watchedcourse.controller.js";

const watchedCourseRouter = express.Router();

watchedCourseRouter.post("/get", httpGetWatchedCourse);

watchedCourseRouter.post("/add", httpAddWatchedCourse);

watchedCourseRouter.post("/update", httpUpdateWatchedCourse);

export default watchedCourseRouter;
