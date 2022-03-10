import express from "express";
import { getSubject } from "../controllers/subjectController";

// TODO: Import Controllers

const subjectRouter = express.Router();

subjectRouter.route("/").get(getSubject);

export default subjectRouter;
