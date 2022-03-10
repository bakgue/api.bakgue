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
  return res.render(ROOT_PUG_PATH + "login", {
    pageTitle: "Check",
    pageDescription:
      "이 절차는 당신이 늘푸른 중학교 2학년 2반인지 확인하는 절차 입니다. 카카오톡 단체방에 올라온 비밀번호를 넣어 주시고, 학번을 알기 위해 학교에서 제공한 이메일 주소를 검증해 주세요.",
  });
};

export const postLogin = (req, res) => {
  // Login processing
  const {
    body: { key, email },
  } = req;

  const passEmailKeys = ["npr.", "@ggm.goe.go.kr"];

  if (
    email.indexOf(passEmailKeys[0]) === -1 ||
    email.indexOf(passEmailKeys[1]) === -1
  ) {
    return res
      .status(STATUS_CODE.BAD_REQUEST_CODE)
      .render(ROOT_PUG_PATH + "login", {
        errorMessage: "학교에서 제공한 이메일 주소를 넣어주시기 바랍니다.",
        pageTitle: "Check",
        pageDescription:
          "이 절차는 당신이 늘푸른 중학교 2학년 2반인지 확인하는 절차 입니다. 카카오톡 단체방에 올라온 비밀번호를 넣어 주시고, 학번을 알기 위해 학교에서 제공한 이메일 주소를 검증해 주세요.",
      });
  }

  if (email.indexOf("s") !== -1) {
    req.session.grad = "Student";
  } else if (email.indexOf("t") !== -1) {
    req.session.grad = "Teacher";
  }

  const keys = {
    masterKey: process.env.MASTER_KEY,
    presidentKey: process.env.PRESIDENT_KEY,
    clientKey: process.env.CLIENT_KEY,
  };

  if (key === keys.clientKey) {
    req.session.accessArea = "Client";
  } else if (key === keys.presidentKey) {
    req.session.accessArea = "President";
  } else if (key === keys.masterKey) {
    req.session.accessArea = "Master";
  } else {
    return res
      .status(STATUS_CODE.BAD_REQUEST_CODE)
      .render(ROOT_PUG_PATH + "login", {
        errorMessage: "Key 가 맞지 않습니다. 다시 시도해 주세요.",
        pageTitle: "Check",
        pageDescription:
          "이 절차는 당신이 늘푸른 중학교 2학년 2반인지 확인하는 절차 입니다. 카카오톡 단체방에 올라온 비밀번호를 넣어 주시고, 학번을 알기 위해 학교에서 제공한 이메일 주소를 검증해 주세요.",
      });
  }

  req.session.loggedIn = true;

  return res.redirect("/");
};
