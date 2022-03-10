import express from "express";
import { getClass } from "../controllers/classController";

// TODO: Import Controllers

const classRouter = express.Router();

classRouter.route("/").get(getClass);

export default classRouter;
