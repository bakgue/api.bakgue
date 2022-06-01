import express from "express";
import morgan from "morgan";
import flash from "express-flash";
import session from "express-session";
import MongoStore from "connect-mongo";
import {localsMiddleware} from "./middlewares";

import rootRouter from "./routers/rootRouter";
import assignmentRouter from "./routers/assignmentRouter";
import subjectRouter from "./routers/subjectRouter";
import apiRouter from "./routers/apiRouter";
import classRouter from "./routers/classRouter";
import profileRouter from "./routers/profileRouter";

const app = express();

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(
	session({
		secret: process.env.COOKIE_SECRET,
		resave: false,
		saveUninitialized: false,
		cookie: {
			maxAge: 100 * 60 * 60 * 24 * 7,
		},
		store: MongoStore.create({
			mongoUrl: process.env.DB_URL,
		}),
	}),
);

app.use((_, res, next) => {
	res.header("Cross-Origin-Embedder-Policy", "require-corp");
	res.header("Cross-Origin-Opener-Policy", "same-origin");
	next();
});

app.use(flash());
app.use(localsMiddleware);
app.use("/static", express.static("assets"));
app.use("/public", express.static("public"));
app.use("/json", express.static("json"));

app.use("/", rootRouter);

app.use("/assignment", assignmentRouter);
app.use("/class", classRouter);
app.use("/subject", subjectRouter);
app.use("/profile", profileRouter);
app.use("/api", apiRouter);

export default app;
