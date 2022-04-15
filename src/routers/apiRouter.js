import express from "express";
import {
  postAddView,
  postCancelSaveAss,
  postCheckSaveAss,
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

export default apiRouter;
