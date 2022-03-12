import express from "express";
import { getClass } from "../controllers/classController";

const classRouter = express.Router();

classRouter.route("/").get(getClass);

export default classRouter;
