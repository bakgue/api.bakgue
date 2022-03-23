import express from "express";
import {
  postDeleteAss,
  getAss,
  getDeleteAss,
  getEditAss,
  getNewAss,
  postEditAss,
  postNewAss,
  watchAss,
} from "../controllers/assignmentController";
import { protectorMiddleware } from "../middlewares";

const assignmentRouter = express.Router();

assignmentRouter.route("/").all(protectorMiddleware).get(getAss);
assignmentRouter
  .route("/new")
  .all(protectorMiddleware)
  .get(getNewAss)
  .post(postNewAss);
assignmentRouter.route("/:assname").all(protectorMiddleware).get(watchAss);
assignmentRouter
  .route("/:assname/edit")
  .all(protectorMiddleware)
  .get(getEditAss)
  .post(postEditAss);
assignmentRouter
  .route("/:assname/delete")
  .all(protectorMiddleware)
  .get(getDeleteAss)
  .post(postDeleteAss);

export default assignmentRouter;
