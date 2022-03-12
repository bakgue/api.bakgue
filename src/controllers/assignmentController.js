import { STATUS_CODE } from "./rootController";
import { BASE_PUG_PATH } from "./rootController";

import pageInfo from "../json/page.json";

const ASS_PUG_PATH = BASE_PUG_PATH + "assignment/";

export const getAss = (req, res) => {
  return res.render(ASS_PUG_PATH + "watch", {
    pageTitle: pageInfo.assignment.home.title,
    pageDescription: pageInfo.assignment.home.description,
  });
};

export const getNewAss = (req, res) => {
  return res.render(ASS_PUG_PATH + "new", {
    pageTitle: pageInfo.assignment.new.title,
    pageDescription: pageInfo.assignment.new.description,
  });
};

export const postNewAss = (req, res) => {
  return res.redirect("/");
};

export const watchAss = (req, res) => {
  return res.render(ASS_PUG_PATH + "watch", {
    pageTitle,
    pageDescription,
  });
};

export const getEditAss = (req, res) => {
  return res.render(ASS_PUG_PATH + "edit", {
    pageTitle,
  });
};

export const postEditAss = (req, res) => {
  return res.redirect("/");
};
