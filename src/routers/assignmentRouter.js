import express from "express";
import {
  deleteAss,
  getAss,
  getDeleteAss,
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
assignmentRouter.route("/:assname/delete").get(getDeleteAss).post(deleteAss);

export default assignmentRouter;
