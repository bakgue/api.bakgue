import express from "express";

import { getProfile } from "../controllers/profileController";
import { protectorMiddleware } from "../middlewares";

const profileRouter = express.Router();

profileRouter.route("/").all(protectorMiddleware).get(getProfile);

export default profileRouter;
