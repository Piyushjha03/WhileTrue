import express from "express";
import { httpAddChapter } from "../controller/chapter.controller.js";

const chapterRouter = express.Router();

chapterRouter.post("/add", httpAddChapter);

export default chapterRouter;
