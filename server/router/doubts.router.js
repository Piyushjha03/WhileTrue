import express from "express";
import { queryController } from "../controller/doubts.controller.js";

const doubtsRouter = express.Router();

doubtsRouter.post("/query", queryController);

export default doubtsRouter;
