// Import Models

import { STATUS_CODE } from "./rootController";
import { BASE_PUG_PATH } from "./rootController";

const SUBJECT_PUG_PATH = BASE_PUG_PATH + "subject/";

export const getSubject = (req, res) => {
  // Render the Teacher Page
  return res.render(SUBJECT_PUG_PATH + "home");
};
