import express from "express";
import {
  getSubject,
  watchSubject,
  watchSubjectAss,
} from "../controllers/subjectController";
import { protectorMiddleware } from "../middlewares";

const subjectRouter = express.Router();

subjectRouter.route("/").all(protectorMiddleware).get(getSubject);
subjectRouter.route("/:subname").all(protectorMiddleware).get(watchSubject);

export default subjectRouter;
