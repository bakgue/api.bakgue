import express from "express";
import {
  getAss,
  getEditAss,
  getNewAss,
  postEditAss,
  postNewAss,
  watchAss,
} from "../controllers/assignmentController";

const assignmentRouter = express.Router();

assignmentRouter.route("/").get(getAss);
assignmentRouter.route("/new").get(getNewAss).post(postNewAss);
assignmentRouter.route("/:assname").get(watchAss);
assignmentRouter.route("/:assname/edit").get(getEditAss).post(postEditAss);

export default assignmentRouter;
