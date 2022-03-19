import { STATUS_CODE } from "./rootController";
import { BASE_PUG_PATH } from "./rootController";

import subjectInfo from "../json/subject.json";

import Assignment from "../model/Assignment";
import Student from "../model/Student";

const ASS_PUG_PATH = BASE_PUG_PATH + "assignment/";

// Development Completed ✅
export const getAss = async (req, res) => {
  const asss = await Assignment.find({});

  return res.render(ASS_PUG_PATH + "home", {
    asss,
  });
};

// Development Completed ✅
export const getNewAss = (req, res) => {
  return res.render(ASS_PUG_PATH + "new");
};

// Development Completed ✅
export const postNewAss = async (req, res) => {
  const {
    body: { title, subject },
  } = req;

  // Title 이 같은 ass 찾기
  const sameTitleAss = await Assignment.findOne({ title });

  // 있으면, Already Taken
  if (sameTitleAss) {
    return res
      .status(STATUS_CODE.ALEADY_TAKEN_CODE)
      .render(ASS_PUG_PATH + "new", {
        errorMessage: "이미 존재하는 이름입니다. 다른 이름으로 바꾸세요.",
      });
  }

  // 없으면, 만들기
  try {
    const createdAssignment = await Assignment.create({
      title,
      subject,
      content: `# ${title}`,
      owner: req.session.loggedInUser._id,
    });

    return res.redirect(`/assignment/${title}/edit`);
  } catch (error) {
    return res
      .status(STATUS_CODE.BAD_REQUEST_CODE)
      .render(ASS_PUG_PATH + "new", {
        errorMessage: `DataBase Error : ${error}`,
      });
  }
};

// Development Completed ✅
export const watchAss = async (req, res) => {
  const {
    params: { assname },
  } = req;

  // Title 이 같은 Assignment 찾기
  const ass = await Assignment.findOne({ title: assname });

  // 없으면 NOT FOUND
  if (!ass) {
    return res
      .status(STATUS_CODE.NOT_FOUND_CODE)
      .render(BASE_PUG_PATH + "root/not-found", {
        type: "과제나 수행",
      });
  }

  return res.render(ASS_PUG_PATH + "watch", {
    ass,
  });
};

// Development Completed ✅
export const getEditAss = async (req, res) => {
  const {
    params: { assname },
  } = req;

  // Title 같은 Assignment 찾기
  const ass = await Assignment.findOne({ title: assname });
  if (!ass) {
    return res
      .status(STATUS_CODE.NOT_FOUND_CODE)
      .render(BASE_PUG_PATH + "root/not-found", {
        type: "과제나 시험",
      });
  }

  // 해당 Assignment 를 만든 사람과 Login 한 Client 가 같은 사람인지 아닌지 확인
  if (String(ass.owner._id) !== String(req.session.loggedInUser._id)) {
    return res
      .status(STATUS_CODE.NOT_ACCEPTABLE_CODE)
      .render(BASE_PUG_PATH + "root/not-allow");
  }

  return res.render(ASS_PUG_PATH + "edit", {
    ass,
  });
};

// Development Completed ✅
export const postEditAss = async (req, res) => {
  const {
    params: { assname },
    body: { title, subject, content },
  } = req;

  const ass = await Assignment.findOne({ title: assname });

  // 해당 Assignment 를 만든 사람과 Login 한 Client 가 같은 사람인지 아닌지 확인
  if (String(ass.owner._id) !== String(req.session.loggedInUser._id)) {
    return res
      .status(STATUS_CODE.NOT_ACCEPTABLE_CODE)
      .render(BASE_PUG_PATH + "root/not-allow");
  }

  // Title 이 같은 ass 찾기
  const sameTitleAss = await Assignment.findOne({ title });

  // 있으면, Already Taken Return
  if (sameTitleAss) {
    if (sameTitleAss.title !== title) {
      return res
        .status(STATUS_CODE.ALEADY_TAKEN_CODE)
        .render(ASS_PUG_PATH + "edit", {
          ass,
          errorMessage: "이미 사용되고 있는 제목입니다.",
        });
    }
  }

  // 아니면, 업데이트
  try {
    const updatedAss = await Assignment.findByIdAndUpdate(ass._id, {
      content,
      title,
      subject,
    });
    return res
      .status(STATUS_CODE.UPDATED_CODE)
      .redirect(`/assignment/${title}`);
  } catch (error) {
    return res
      .status(STATUS_CODE.BAD_REQUEST_CODE)
      .render(ASS_PUG_PATH + "edit", {
        ass,
        errorMessage: `DB Error : ${error}`,
      });
  }
};

export const getDeleteAss = (req, res) => {
  const {
    params: { assname },
  } = req;

  // Assname 과 같은 Assignment 찾기

  // 없으면 NOT FOUND

  // 있으면
  return res.render(ASS_PUG_PATH + "delete", {
    assname,
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
