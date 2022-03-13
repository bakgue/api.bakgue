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
    return res.render(BASE_PUG_PATH + "root/not-found", {
      noShowTop: true,
      pageTitle: "Not Found - 404",
      paragraph: `"${subname}" 이라는 과목을 찾지 못했습니다`,
      to: "/subject",
      suggestionParagraph: "그냥 과목 홈페이지로 갈까요?",
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

export const watchSubjectAss = (req, res) => {
  return res.render(SUBJECT_PUG_PATH + "assignment", {
    pageTitle: "All of the assignments of this {Subject Name}",
    pageDescription:
      "여기에서 {Subject Name} 에 관한 모든 수행 및 시험들을 보실 수 있습니다.",
  });
};
