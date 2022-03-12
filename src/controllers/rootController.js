// Import Models
import Student from "../model/Student";

import fs from "fs";
import bcrypt from "bcrypt";
import studentInfo from "../json/student.json";
import pageInfo from "../json/page.json";

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
  // Render the Home page
  let pageTitle;
  let pageDescription;

  if (!req.session.loggedIn) {
    pageTitle = pageInfo.homeNotLogin.title;
    pageDescription = pageInfo.homeNotLogin.description;
  } else if (req.session.loggedIn) {
    pageTitle = pageInfo.home.title;
    pageDescription = pageInfo.home.description;
  }

  return res.render(ROOT_PUG_PATH + "home", {
    pageTitle,
    pageDescription,
  });
};

export const getSignup = (req, res) => {
  // Render the Signup page
  return res.render(ROOT_PUG_PATH + "signup", {
    pageTitle: pageInfo.signup.title,
    pageDescription: pageInfo.signup.description,
  });
};

export const postSignup = async (req, res) => {
  // Signup processing
  const {
    body: { key, idAndName, username, password, confirmPassword },
  } = req;

  const studentIdAndName = idAndName.replace(/\s/g, "");
  let studentId;
  let studentName;

  try {
    studentId = studentIdAndName.substr(0, 5);
    studentName = studentIdAndName.substr(5, studentIdAndName.length);
  } catch (error) {
    return res
      .status(STATUS_CODE.BAD_REQUEST_CODE)
      .render(ROOT_PUG_PATH + "signup", {
        pageTitle: pageInfo.signup.title,
        pageDescription: pageInfo.signup.description,
        errorMessage: "반 번호를 알맞게 넣어주시기 바랍니다. ex) 20214 소설",
      });
  }

  if (password !== confirmPassword) {
    return res
      .status(STATUS_CODE.BAD_REQUEST_CODE)
      .render(ROOT_PUG_PATH + "signup", {
        pageTitle: pageInfo.signup.title,
        pageDescription: pageInfo.signup.description,
        errorMessage: "비밀번호가 일치하지 않습니다.",
      });
  }

  let no = true;
  for (let i = 0; i < studentInfo.length; i++) {
    const element = studentInfo[i];
    if (element.id === studentId && element.name === studentName) {
      no = false;
    }
  }

  if (no) {
    return res
      .status(STATUS_CODE.BAD_REQUEST_CODE)
      .render(ROOT_PUG_PATH + "signup", {
        pageTitle: pageInfo.signup.title,
        pageDescription: pageInfo.signup.description,
        errorMessage:
          "해당 반 번호와 이름이 서로 일치하는 것이 없습니다. 자신의 반 번호와 이름으로 다시 시도해 주시기 바랍니다.",
      });
  }

  const sameIdStudent = await Student.findOne({ number: studentId });
  const sameUsernameStudent = await Student.findOne({ username });

  if (sameIdStudent || sameUsernameStudent) {
    return res
      .status(STATUS_CODE.BAD_REQUEST_CODE)
      .render(ROOT_PUG_PATH + "signup", {
        pageTitle: pageInfo.signup.title,
        pageDescription: pageInfo.signup.description,
        errorMessage: "입력하신 정보의 학생은 이미 로그인된 상태 입니다.",
      });
  }

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
        pageTitle: pageInfo.signup.title,
        pageDescription: pageInfo.signup.description,
        errorMessage: `DataBase Error : ${err}`,
      });
  }
};

export const getSignin = (req, res) => {
  // Render the Signin page
  return res.render(ROOT_PUG_PATH + "signin", {
    pageTitle: pageInfo.signin.title,
    pageDescription: pageInfo.signin.description,
  });
};

export const postSignin = async (req, res) => {
  // Render the Signin page

  const {
    body: { idAndName, password },
  } = req;

  const studentIdAndName = idAndName.replace(/\s/g, "");
  const studentId = studentIdAndName.substr(0, 5);
  const studentName = studentIdAndName.substr(5, studentIdAndName.length);

  const student = await Student.findOne({
    number: studentId,
    name: studentName,
  });

  if (!student) {
    return res
      .status(STATUS_CODE.BAD_REQUEST_CODE)
      .render(ROOT_PUG_PATH + "signin", {
        pageTitle: pageInfo.signin.title,
        pageDescription: pageInfo.signin.description,
        errorMessage: "학생을 찾지 못했습니다. 다시 입력해 주시기 바랍니다.",
      });
  }

  const comparePassword = await bcrypt.compare(password, student.password);
  console.log(comparePassword);

  if (!comparePassword) {
    return res
      .status(STATUS_CODE.BAD_REQUEST_CODE)
      .render(ROOT_PUG_PATH + "signin", {
        pageTitle: pageInfo.signin.title,
        pageDescription: pageInfo.signin.description,
        errorMessage: "비밀번호가 맞지 않습니다.",
      });
  }

  req.session.accessArea = checkGrad(student.key);
  req.session.loggedIn = true;
  return res.redirect("/");
};
