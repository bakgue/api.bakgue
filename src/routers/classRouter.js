import express from "express";
import { getClass } from "../controllers/classController";
import { protectorMiddleware } from "../middlewares";

const classRouter = express.Router();

classRouter.route("/").all(protectorMiddleware).get(getClass);

export default classRouter;
