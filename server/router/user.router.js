import express from "express";
import { getUserInfo } from "../controller/user.controller.js";

const userRouter = express.Router();

userRouter.post("/getinfo", getUserInfo);

export default userRouter;
