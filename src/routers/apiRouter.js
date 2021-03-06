import express from "express";
import {
	postCancelSaveAss,
	postCheckSaveAss,
	postSaveAss,
	postAddIssues,
	postEditProfile,
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
	.route("/profile/edit/:username/:bio")
	.all(protectorMiddleware)
	.post(postEditProfile);

export default apiRouter;
