import express from "express";
import {
  postAddView,
  postCancelSaveAss,
  postCheckSaveAss,
  postSaveAss,
} from "../controllers/apiController";
import { protectorMiddleware } from "../middlewares";

const apiRouter = express.Router();

const assRouter = express.Router();
const saveRouter = express.Router();

apiRouter.use("/assignment", assRouter);
assRouter.use("/save", saveRouter);

saveRouter.route("/:assname").all(protectorMiddleware).post(postSaveAss);
saveRouter
  .route("/:assname/cancel")
  .all(protectorMiddleware)
  .post(postCancelSaveAss);

saveRouter
  .route("/:assname/check")
  .all(protectorMiddleware)
  .post(postCheckSaveAss);

assRouter.route("/view/:assname").all(protectorMiddleware).post(postAddView);

export default apiRouter;
