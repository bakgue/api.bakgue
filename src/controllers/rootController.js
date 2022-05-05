import Student from "../model/Student";

import bcrypt from "bcrypt";
import studentInfo from "../../json/student.json";

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
    body: {
      key,
      grad,
      classOne,
      classTwo,
      idOne,
      idTwo,
      name,
      username,
      password,
      confirmPassword,
    },
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
  const studentId = `${grad}${classOne}${classTwo}${idOne}${idTwo}`;
  const studentName = name;

  // JSON 를 통해 이 학번 름이 있는지 없는지 확인
  const isExists = studentInfo[studentId];
  if (!isExists) {
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
        errorMessage:
          "입력하신 정보의 학생은 이미 회원가입된 상태 입니다. 혹시 회원가입을 하지 않으셨습니까? 그렇다면, novelier.webbelier@gmail.com 으로 문의해 주시기 바랍니다.",
      });
  }

  // DB 에 없다면 처음 온 Client 이므로, DB 에서 만듦. 에러가 날 여지가 있으므로, 에러가 났다면 ErrorMessage 를 보내 다시 Rendering
  try {
    const createdStudent = await Student.create({
      username,
      password,
      key,
      name: studentName,
      number: studentId,
    });
    console.log(`SIGNUP : ${createdStudent}`);
    return res.status(STATUS_CODE.CREATED_CODE).redirect("/signin");
  } catch (error) {
    return res
      .status(STATUS_CODE.BAD_REQUEST_CODE)
      .render(ROOT_PUG_PATH + "signup", {
        errorMessage: `DataBase Error : ${error}`,
      });
  }
};

export const getSignin = (req, res) => {
  // Rendering Sign In Page
  return res.render(ROOT_PUG_PATH + "signin");
};

export const postSignin = async (req, res) => {
  const {
    body: { grad, classOne, classTwo, idOne, idTwo, name, password },
  } = req;

  // 학번과 이름 변수에 저장
  const studentId = `${grad}${classOne}${classTwo}${idOne}${idTwo}`;
  const studentName = name;

  // JSON 에서 같은 학번과 이름을 가진 학생 긁어옴
  const isExists = studentInfo[studentId].name == studentName;
  if (!isExists) {
    return res
      .status(STATUS_CODE.BAD_REQUEST_CODE)
      .render(ROOT_PUG_PATH + "signin", {
        errorMessage: `${studentName} 학생은 저희 반에 없습니다.`,
      });
  }

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
        errorMessage: "계정을 찾지 못했습니다. 다시 입력해 주시기 바랍니다.",
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
  req.session.loggedIn = true;
  req.session.loggedInUser = student;

  res.locals.loggedIn = true;
  res.locals.loggedInUser = student;

  console.log(`SIGNIN : ${student}`);
  return res.redirect("/");
};

export const logout = (req, res) => {
  // Request 의 Session 에 로그인 확인 변수가 있으므로 삭제 후 HomePage 로 이동
  req.session.destroy();
  return res.redirect("/");
};
