import express from "express";
import {
  createCourse,
  httpGetAllCourse,
  httpGetCourse,
} from "../controller/course.controller.js";

const courseRouter = express.Router();

courseRouter.post("/create", createCourse);
courseRouter.get("/getCourseInfo", httpGetCourse);
courseRouter.get("/getAll", httpGetAllCourse);

export default courseRouter;
