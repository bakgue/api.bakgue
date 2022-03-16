import Student from "../model/Student";

import bcrypt from "bcrypt";
import studentInfo from "../json/student.json";

export const BASE_PUG_PATH = "../views/";
const ROOT_PUG_PATH = BASE_PUG_PATH + "root/";

export const checkGrad = (value) => {
  const keys = {
    masterKey: process.env.MASTER_KEY,
    presidentKey: process.env.PRESIDENT_KEY,
    clientKey: process.env.CLIENT_KEY,
  };

  if (value === keys.clientKey) {
    return "C";
  } else if (value === keys.presidentKey) {
    return "P";
  } else if (value === keys.masterKey) {
    return "M";
  } else {
    return false;
  }
};

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
  // Rendering Home Page
  return res.render(ROOT_PUG_PATH + "home");
};

export const getSignup = (req, res) => {
  // Rendering Sign Up Page
  return res.render(ROOT_PUG_PATH + "signup");
};

export const postSignup = async (req, res) => {
  // Sign Up 에 필요한 모든 정보들을 Client 로 부터 가지고 옴
  const {
    body: { key, idAndName, username, password, confirmPassword },
  } = req;

  // Password 와 Confirm Password 가 같지 않다면 ErrorMessage 를 보내 다시 Rendering
  if (password !== confirmPassword) {
    return res
      .status(STATUS_CODE.BAD_REQUEST_CODE)
      .render(ROOT_PUG_PATH + "signup", {
        errorMessage: "비밀번호가 일치하지 않습니다.",
      });
  }

  // 공백을 제거한 학번 이름 저장
  const studentIdAndName = idAndName.replace(/\s/g, "");

  let studentId;
  let studentName;

  // 공백을 제거한 학번 이름을 가지고 학번과 이름을 각각 구함 에러가 날 여지가 있어, 에러가 났다면, ErrorMessage 를 보내 다시 Rendering
  try {
    studentId = studentIdAndName.substr(0, 5);
    studentName = studentIdAndName.substr(5, studentIdAndName.length);
  } catch (error) {
    return res
      .status(STATUS_CODE.BAD_REQUEST_CODE)
      .render(ROOT_PUG_PATH + "signup", {
        errorMessage: "반 번호를 알맞게 넣어주시기 바랍니다. ex) 20214 소설",
      });
  }

  // JSON 를 통해 이 학번 이름이 있는지 없는지 확인
  let no = true;
  for (let i = 0; i < studentInfo.length; i++) {
    const element = studentInfo[i];
    if (element.id === studentId && element.name === studentName) {
      no = false;
    }
  }

  // 없다면 ErrorMessage 를 보내 다시 Rendering
  if (no) {
    return res
      .status(STATUS_CODE.BAD_REQUEST_CODE)
      .render(ROOT_PUG_PATH + "signup", {
        errorMessage:
          "해당 반 번호와 이름이 서로 일치하는 것이 없습니다. 자신의 반 번호와 이름으로 다시 시도해 주시기 바랍니다.",
      });
  }

  // 위의 절차를 모두 통과시 해당 학번과 Username 이 같은 유저를 MongoDB 로 부터 긇어옴
  const sameIdStudent = await Student.findOne({ number: studentId });
  const sameUsernameStudent = await Student.findOne({ username });

  // 둘 중에 하나라도 있다면 ErrorMessage 를 보내 다시 Rendering
  if (sameIdStudent || sameUsernameStudent) {
    return res
      .status(STATUS_CODE.BAD_REQUEST_CODE)
      .render(ROOT_PUG_PATH + "signup", {
        errorMessage: "입력하신 정보의 학생은 이미 회원가입된 상태 입니다.",
      });
  }

  // DB 에 없다면 처음 온 Client 이므로, MongoDB 에서 만듦. 에러가 날 여지가 있으므로, 에러가 났다면 ErrorMessage 를 보내 다시 Rendering
  try {
    const createdStudent = await Student.create({
      username,
      password,
      key,
      name: studentName,
      number: studentId,
    });
    return res.status(STATUS_CODE.CREATED_CODE).redirect("/signin");
  } catch (error) {
    return res
      .status(STATUS_CODE.BAD_REQUEST_CODE)
      .render(ROOT_PUG_PATH + "signup", {
        errorMessage: `DataBase Error : ${err}`,
      });
  }
};

export const getSignin = (req, res) => {
  // Rendering Sign In Page
  return res.render(ROOT_PUG_PATH + "signin");
};

export const postSignin = async (req, res) => {
  // Sign In 에 필요한 모든 정보들을 가지고 옴
  const {
    body: { idAndName, password },
  } = req;

  // 학번과 이름 변수에 저장
  const studentIdAndName = idAndName.replace(/\s/g, "");
  const studentId = studentIdAndName.substr(0, 5);
  const studentName = studentIdAndName.substr(5, studentIdAndName.length);

  // DB 에서 같은 학번과 이름을 가진 계정 긇어옴
  const student = await Student.findOne({
    number: studentId,
    name: studentName,
  });

  // 없으면, ErrorMessage 를 보내 다시 Rendering
  if (!student) {
    return res
      .status(STATUS_CODE.BAD_REQUEST_CODE)
      .render(ROOT_PUG_PATH + "signin", {
        errorMessage: "학생을 찾지 못했습니다. 다시 입력해 주시기 바랍니다.",
      });
  }

  // Password 를 DB 에 있는 Hashing 된 Password 와 Compare
  const comparePassword = await bcrypt.compare(password, student.password);

  // Compared 된 Password 가 서로 같지 않다면, ErrorMessage 를 보내 다시 Rendering
  if (!comparePassword) {
    return res
      .status(STATUS_CODE.BAD_REQUEST_CODE)
      .render(ROOT_PUG_PATH + "signin", {
        errorMessage: "비밀번호가 맞지 않습니다.",
      });
  }

  // 위의 절차를 모두 통과시 Request 의 Sessison 에 로그인 확인 변수 저장
  req.session.accessArea = checkGrad(student.key);
  req.session.loggedIn = true;
  return res.redirect("/");
};

export const logout = (req, res) => {
  // Request 의 Session 에 로그인 확인 변수가 있으므로 삭제 후 HomePage 로 이동
  req.session.destroy();
  return res.redirect("/");
};
