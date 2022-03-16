import Assignment from "../model/Assignment";

import { STATUS_CODE } from "./rootController";
import { BASE_PUG_PATH } from "./rootController";

import subjectsInfo from "../json/subject.json";

const SUBJECT_PUG_PATH = BASE_PUG_PATH + "subject/";

const toUppercaseOnlyFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const getSubject = (req, res) => {
  // Subject Home Page 를 Rendering
  const allSubject = subjectsInfo;

  return res.render(SUBJECT_PUG_PATH + "home", {
    subjects: allSubject,
  });
};

export const watchSubject = (req, res) => {
  const {
    params: { subname },
  } = req;

  // JSON 에 Subname 에 해당하는 Subject 가 있는지 확인
  let subjectObj;
  for (let i = 0; i < subjectsInfo.length; i++) {
    const element = subjectsInfo[i];
    if (String(element.englishName) === String(subname)) {
      subjectObj = element;
    }
  }

  // 없으면 NOT FOUND Page Rendering 함
  if (!subjectObj) {
    return res
      .status(STATUS_CODE.NOT_FOUND_CODE)
      .render(BASE_PUG_PATH + "root/not-found", {
        type: "과목",
      });
  }

  // 있으면, 해당 englishName 의 첫 글자를 대문자로 치환
  subjectObj.englishName = toUppercaseOnlyFirstLetter(subjectObj.englishName);

  return res.render(SUBJECT_PUG_PATH + "watch", {
    pageTitle: `${subjectObj.englishName}`,
    pageDescription: `${subjectObj.name} 에 대한 정보입니다.`,
    subjectObj,
  });
};

export const watchSubjectAss = async (req, res) => {
  const {
    params: { subname },
  } = req;

  // subname 이 Subject JSON 에 있는지 여부 확인
  let sameSubjectName;
  for (let i = 0; i < subjectsInfo.length; i++) {
    const element = subjectsInfo[i];
    if (element.englishName === subname) {
      sameSubjectName = element;
    }
  }

  // 없으면 NOT FOUND
  if (!sameSubjectName) {
    return res
      .status(STATUS_CODE.NOT_FOUND_CODE)
      .render(BASE_PUG_PATH + "root/not-found", {
        type: "과목",
      });
  }

  // DB 에 있는 모든 Assignment 들을 긇어옴
  const subjectAss = await Assignment.find({ subject: subname });

  // 없으면 NOT FOUND
  if (subjectAss.length === 0) {
    return res
      .status(STATUS_CODE.NOT_FOUND_CODE)
      .render(BASE_PUG_PATH + "root/not-found", {
        type: "과제나 시험",
      });
  }

  return res.render(SUBJECT_PUG_PATH + "assignment", {
    pageTitle: `All of the assignments of this ${subname}`,
    pageDescription: `여기에서 ${subname} 에 관한 모든 수행 및 시험들을 보실 수 있습니다`,
    assignments: subjectAss,
  });
};
