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
  .route("/assignment/:assname/issues/:issueId/emotion/add/:type")
  .all(protectorMiddleware)
  .post(postAddEmotion);

<<<<<<< Updated upstream
=======
apiRouter
  .route("/assignment/:assname/issues/:issueId/emotion/delete/:type")
  .all(protectorMiddleware)
  .post(postDeleteEmotion);

>>>>>>> Stashed changes
export default apiRouter;
