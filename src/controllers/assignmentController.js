import { STATUS_CODE } from "./rootController";
import { BASE_PUG_PATH } from "./rootController";

import Assignment from "../model/Assignment";

const ASS_PUG_PATH = BASE_PUG_PATH + "assignment/";

export const getAss = async (req, res) => {
  const asss = await Assignment.find({});
  return res.render(ASS_PUG_PATH + "home", {
    asss,
  });
};

export const getNewAss = (req, res) => {
  return res.render(ASS_PUG_PATH + "new");
};

export const postNewAss = (req, res) => {
  const {
    body: { title, subject },
  } = req;

  // Subject 가 한글인지 영어인지 확인

  // 영어가 아니면 ErrorMessage 를 보내 다시 Rendering

  // Subject 가 Subject JSON 안에 있는지 확인

  // 없으면 ErrorMessage 를 보내 다시 Rendering

  // Title 이 같은 ass 찾기

  // 있으면, Already Taken Return

  // 없으면, 만들기

  return res.redirect(`/assignment/${title}/edit`);
};

export const watchAss = async (req, res) => {
  // Title 이 같은 Assignment 찾기

  return res.render(ASS_PUG_PATH + "watch", {
  });
};

export const getEditAss = async (req, res) => {
  const {
    params: { assname },
  } = req;

  // Title 같은 Assignment 찾기

  // 없으면 NOT FOUND
  return res.render(ASS_PUG_PATH + "edit", {
  });
};

export const postEditAss = (req, res) => {
  const {
    body: { title, subject, content },
  } = req;

  // 영어가 아니면 ErrorMessage 를 보내 다시 Rendering

  // Subject 가 Subject JSON 안에 있는지 확인

  // 없으면 ErrorMessage 를 보내 다시 Rendering

  // Title 이 같은 ass 찾기

  // 있으면, Already Taken Return

  // 없으면, 업데이트

  return res.redirect("/");
};

export const getDeleteAss = (req, res) => {
  const {
    params: { assname },
  } = req;

  // Assname 과 같은 Assignment 찾기

  // 없으면 NOT FOUND

  // 있으면
  return res.render(ASS_PUG_PATH + "delete", {
  });
};

export const deleteAss = (req, res) => {
  const {
    params: { assname },
    body: { name },
  } = req;

  // Assname 과 name 같은지 확인

  // Assname 과 같은 Assignment 를 DB 에서 찾기

  // 없으면 NOT FOUND

  // 있으면 Delete

  return res.redirect("/assignment");
};
