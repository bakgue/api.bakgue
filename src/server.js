import express from "express";
import morgan from "morgan";
import flash from "express-flash";
import session, { Store } from "express-session";
import MongoStore from "connect-mongo";
import { localsMiddleware } from "./middlewares";

import rootRouter from "./routers/rootRouter";
import docRouter from "./routers/docRouter";
import apiRouter from "./routers/apiRouter";

const app = express();
app.use(morgan("dev"));
app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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
  })
);

app.use((_, res, next) => {
  res.header("Cross-Origin-Embedder-Policy", "require-corp");
  res.header("Cross-Origin-Opener-Policy", "same-origin");
  next();
});

app.use(flash());
app.use(localsMiddleware);
app.use("/static", express.static("assets"));

app.use("/", rootRouter);
app.use("/doc", docRouter);
app.use("/api", apiRouter);
