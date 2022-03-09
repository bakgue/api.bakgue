import express from "express";
import { getHome, getLogin, postLogin } from "../controllers/rootController";
import { publicOnlyMiddleware } from "../middlewares";

// TODO: Import Controllers

const rootRouter = express.Router();

rootRouter.route("/").get(getHome);
rootRouter
  .route("/login")
  .all(publicOnlyMiddleware)
  .get(getLogin)
  .post(postLogin);

export default rootRouter;
