import express from "express";
import {
  getHome,
  getSignin,
  getSignup,
  logout,
  postSignin,
  postSignup,
} from "../controllers/rootController";
import { protectorMiddleware, publicOnlyMiddleware } from "../middlewares";

const rootRouter = express.Router();

rootRouter.route("/").get(getHome);
rootRouter.route("/logout").all(protectorMiddleware).get(logout);
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
