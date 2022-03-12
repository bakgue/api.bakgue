import { STATUS_CODE } from "./rootController";
import { BASE_PUG_PATH } from "./rootController";

import pageInfo from "../json/page.json";

const CLASS_PUG_PATH = BASE_PUG_PATH + "class/";

export const getClass = (req, res) => {
  console.log(pageInfo.class.home.title);
  return res.render(CLASS_PUG_PATH + "home", {
    pageTitle: pageInfo.class.home.title,
    pageDescription: pageInfo.class.home.description,
  });
};
