import Assignment from "../model/Assignment";

import { STATUS_CODE } from "./rootController";
import { BASE_PUG_PATH } from "./rootController";

import pageInfo from "../json/page.json";
import subjectsInfo from "../json/subject.json";

const SUBJECT_PUG_PATH = BASE_PUG_PATH + "subject/";

const toUppercaseOnlyFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const getSubject = (req, res) => {
  const subjectHomeObj = pageInfo.subject.home;
  const allSubject = subjectsInfo;

  return res.render(SUBJECT_PUG_PATH + "home", {
    pageTitle: subjectHomeObj.title,
    pageDescription: subjectHomeObj.description,
    pageSubtitle: subjectHomeObj.subtitle,
    pageAdditionalDescription: subjectHomeObj.additionalDescription,
    subjects: allSubject,
  });
};

export const watchSubject = (req, res) => {
  const {
    params: { subname },
  } = req;

  let subjectObj;

  for (let i = 0; i < subjectsInfo.length; i++) {
    const element = subjectsInfo[i];
    if (String(element.englishName) === String(subname)) {
      subjectObj = element;
    }
  }

  if (!subjectObj) {
    return res
      .status(STATUS_CODE.NOT_FOUND_CODE)
      .render(BASE_PUG_PATH + "root/not-found", {
        noShowTop: true,
        type: "과목",
      });
  }

  subjectObj.englishName = toUppercaseOnlyFirstLetter(subjectObj.englishName);

  return res.render(SUBJECT_PUG_PATH + "watch", {
    noShowTop: true,
    subtitle: `${subjectObj.englishName}`,
    additionalDescription: `${subjectObj.name} 에 대한 정보입니다.`,
    subjectObj,
  });
};

export const watchSubjectAss = async (req, res) => {
  const {
    params: { subname },
  } = req;

  let sameSubjectName;
  for (let i = 0; i < subjectsInfo.length; i++) {
    const element = subjectsInfo[i];
    if (element.englishName === subname) {
      sameSubjectName = element;
    }
  }

  if (!sameSubjectName) {
    return res
      .status(STATUS_CODE.NOT_FOUND_CODE)
      .render(BASE_PUG_PATH + "root/not-found", {
        type: "과목",
      });
  }

  const subjectAss = await Assignment.find({ subject: subname });

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
    subtitle: `${subname}`,
    pageAdditionalDescription: `${subname} 에 대한 모든 과제와 시험들을 보실 수 있습니다`,
    assignments: subjectAss,
  });
};
