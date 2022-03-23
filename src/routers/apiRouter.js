import express from "express";
import { protectorMiddleware } from "../middlewares";

const apiRouter = express.Router();

apiRouter.route("/assignment/save/:assname").all(protectorMiddleware);
apiRouter.route("/assignment/save/:assname/cancel").all(protectorMiddleware);

export default apiRouter;
