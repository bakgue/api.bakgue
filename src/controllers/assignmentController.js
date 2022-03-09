// Import Models

import { STATUS_CODE } from "./rootController";
import { BASE_PUG_PATH } from "./rootController";

const ASS_PUG_PATH = BASE_PUG_PATH + "assignment/";

export const getAss = (req, res) => {
  return res.render(ASS_PUG_PATH + "home");
};
