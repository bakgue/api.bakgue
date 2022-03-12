import express from "express";
import {
  getSubject,
  watchSubject,
  watchSubjectAss,
} from "../controllers/subjectController";

const subjectRouter = express.Router();

subjectRouter.route("/").get(getSubject);
subjectRouter.route("/:subname").get(watchSubject);
subjectRouter.route("/:subname/assignment").get(watchSubjectAss);

export default subjectRouter;
