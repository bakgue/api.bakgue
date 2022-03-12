import express from "express";
import { getSubject, watchSubject } from "../controllers/subjectController";

const subjectRouter = express.Router();

subjectRouter.route("/").get(getSubject);
subjectRouter.route("/:subname").get(watchSubject);

export default subjectRouter;
