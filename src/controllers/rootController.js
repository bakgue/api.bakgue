// Import Models

export const BASE_PUG_PATH = "../views/";
const ROOT_PUG_PATH = BASE_PUG_PATH + "root/";

export const STATUS_CODE = {
  OK_CODE: 200,
  CREATED_CODE: 201,
  UPDATED_CODE: 204,
  FOUND_CODE: 302,
  BAD_REQUEST_CODE: 400,
  NOT_FOUND_CODE: 404,
  NOT_ACCEPTABLE_CODE: 405,
  ALEADY_TAKEN_CODE: 409,
};

export const getHome = (req, res) => {
  // Render the Home page
  return res.render(ROOT_PUG_PATH + "home");
};

export const getLogin = (req, res) => {
  // Render the Login page
  return res.render(ROOT_PUG_PATH + "login");
};

export const postLogin = (req, res) => {
  // Login processing
};
