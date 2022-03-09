import express from "express";
import { getTeacher } from "../controllers/teacherController";

// TODO: Import Controllers

const teacherRouter = express.Router();

teacherRouter.route("/").get(getTeacher);

export default teacherRouter;
