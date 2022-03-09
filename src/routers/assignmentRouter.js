import express from "express";
import { getAss } from "../controllers/assignmentController";

// TODO: Import Controllers

const assignmentRouter = express.Router();

assignmentRouter.route("/").get(getAss);

export default assignmentRouter;
