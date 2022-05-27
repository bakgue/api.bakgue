import express from "express";
import {
  postCancelSaveAss,
  postCheckSaveAss,
  postSaveAss,
  postAddIssues,
  postAddEmotion,
} from "../controllers/apiController";
import { protectorMiddleware } from "../middlewares";

const apiRouter = express.Router();

apiRouter
  .route("/assignment/:assname/save")
  .all(protectorMiddleware)
  .post(postSaveAss);
apiRouter
  .route("/assignment/:assname/save/check")
  .all(protectorMiddleware)
  .post(postCheckSaveAss);

apiRouter
  .route("/assignment/:assname/save/cancel")
  .all(protectorMiddleware)
  .post(postCancelSaveAss);

apiRouter
  .route("/assignment/:assname/issues/create/:content")
  .all(protectorMiddleware)
  .post(postAddIssues);

apiRouter
  .route("/assignment/:assname/issues/emotion/add/:type")
  .all(protectorMiddleware)
  .post(postAddEmotion);

export default apiRouter;
