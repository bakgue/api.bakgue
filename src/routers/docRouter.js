import express from "express";
import { getDoc } from "../controllers/docController";

// TODO: Import Controllers

const docRouter = express.Router();

docRouter.route("/").get(getDoc);

export default docRouter;
