import { STATUS_CODE } from "./rootController";
import { BASE_PUG_PATH } from "./rootController";

const CLASS_PUG_PATH = BASE_PUG_PATH + "class/";

export const getClass = (req, res) => {
  return res.render(CLASS_PUG_PATH + "home");
};
