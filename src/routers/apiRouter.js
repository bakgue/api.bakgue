import express from "express";
import {
  postCancelSaveAss,
  postCheckSaveAss,
  postSaveAss,
  postAddIssues,
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

export default apiRouter;
