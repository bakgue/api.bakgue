// Import Models

import { STATUS_CODE } from "./rootController";
import { BASE_PUG_PATH } from "./rootController";

const TEACHER_PUG_PATH = BASE_PUG_PATH + "teacher/";

export const getTeacher = (req, res) => {
  // Render the Teacher Page
  return res.render(TEACHER_PUG_PATH + "home");
};
