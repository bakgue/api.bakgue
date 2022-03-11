import express from "express";
import {
  getHome,
  getSignin,
  getSignup,
  postSignin,
  postSignup,
} from "../controllers/rootController";
import { publicOnlyMiddleware } from "../middlewares";

// TODO: Import Controllers

const rootRouter = express.Router();

rootRouter.route("/").get(getHome);
rootRouter
  .route("/signup")
  .all(publicOnlyMiddleware)
  .get(getSignup)
  .post(postSignup);
rootRouter
  .route("/signin")
  .all(publicOnlyMiddleware)
  .get(getSignin)
  .post(postSignin);

export default rootRouter;
