import { STATUS_CODE } from "./rootController";
import { BASE_PUG_PATH } from "./rootController";

import pageInfo from "../json/page.json";

const SUBJECT_PUG_PATH = BASE_PUG_PATH + "subject/";

export const getSubject = (req, res) => {
  return res.render(SUBJECT_PUG_PATH + "home", {
    pageTitle: pageInfo.subject.home.title,
    pageDescription: pageInfo.subject.home.description,
  });
};

export const watchSubject = (req, res) => {
  return res.render(SUBJECT_PUG_PATH + "watch", {
    pageTitle: "Information of {Subject Name}",
  });
};
