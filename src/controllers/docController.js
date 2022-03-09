// Import Models

import { STATUS_CODE } from "./rootController";
import { BASE_PUG_PATH } from "./rootController";

const DOC_PUG_PATH = BASE_PUG_PATH + "doc/";

export const getDoc = (req, res) => {
  // Render the Doc Page
  return res.render(DOC_PUG_PATH + "home");
};
