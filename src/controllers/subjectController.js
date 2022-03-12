import { STATUS_CODE } from "./rootController";
import { BASE_PUG_PATH } from "./rootController";

import pageInfo from "../json/page.json";
import subjectsInfo from "../json/subject.json";

const SUBJECT_PUG_PATH = BASE_PUG_PATH + "subject/";

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
  return res.render(SUBJECT_PUG_PATH + "watch", {
    pageTitle: "Information of {Subject Name}",
  });
};

export const watchSubjectAss = (req, res) => {
  return res.render(SUBJECT_PUG_PATH + "assignment", {
    pageTitle: "All of the assignments of this {Subject Name}",
    pageDescription:
      "여기에서 {Subject Name} 에 관한 모든 수행 및 시험들을 보실 수 있습니다.",
  });
};
