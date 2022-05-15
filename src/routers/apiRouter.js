import express from "express";
import {
  postAddIssues,
  postCancelSaveAss,
  postCheckSaveAss,
  postDeleteIssues,
  postSaveAss,
} from "../controllers/apiController";
import { protectorMiddleware } from "../middlewares";

const apiRouter = express.Router();

apiRouter
  .route("/assignment/save/:assname")
  .all(protectorMiddleware)
  .post(postSaveAss);
apiRouter
  .route("/assignment/save/:assname/check")
  .all(protectorMiddleware)
  .post(postCheckSaveAss);

apiRouter
  .route("/assignment/save/:assname/cancel")
  .all(protectorMiddleware)
  .post(postCancelSaveAss);

apiRouter
  .route("/assignment/issues/create")
  .all(protectorMiddleware)
  .post(postAddIssues);

apiRouter
  .route("/assignment/issues/delete")
  .all(protectorMiddleware)
  .post(postDeleteIssues);

export default apiRouter;
