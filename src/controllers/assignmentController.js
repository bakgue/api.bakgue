import { STATUS_CODE } from "./rootController";
import { BASE_PUG_PATH } from "./rootController";

import subjectInfo from "../json/subject.json";

import Assignment from "../model/Assignment";
import Student from "../model/Student";

const ASS_PUG_PATH = BASE_PUG_PATH + "assignment/";

// Development Completed ✅
export const getAss = async (req, res) => {
  const assInDB = await Assignment.find({});
  let asss = JSON.parse(JSON.stringify(assInDB));

  for (let i = 0; i < asss.length; i++) {
    const ass = asss[i];
    asss[i].createdAt = new Date(ass.createdAt);
    for (let j = 0; j < subjectInfo.length; j++) {
      const element = subjectInfo[j];
      if (ass.subject === element.englishName) {
        asss[i].subject = element;
      }
    }
  }

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
    body: {
      title,
      subject,
      fromMonth,
      fromDay,
      fromClass,
      toMonth,
      toDay,
      toClass,
    },
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

  // Check
  try {
    if (
      4 <= Number(fromMonth) <= 12 &&
      4 <= Number(toMonth) <= 12 &&
      1 <= Number(fromDay) <= 31 &&
      1 <= Number(toDay) <= 31 &&
      1 <= Number(fromClass) <= 7 &&
      1 <= Number(toClass) <= 7
    ) {
    } else {
      return res.render(ASS_PUG_PATH + "new", {
        errorMessage: "유효한 일자를 넣어주시기 바랍니다.",
      });
    }
  } catch (error) {
    return res.render(ASS_PUG_PATH + "new", {
      errorMessage: `Server Error : ${error.__msg}`,
    });
  }

  // 없으면, 만들기
  try {
    const createdAssignment = await Assignment.create({
      title,
      subject,
      deadLine: {
        from: {
          month: fromMonth,
          day: fromDay,
          class: fromClass,
        },
        to: {
          month: fromMonth,
          day: fromDay,
          class: fromClass,
        },
      },
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
  const ass = await Assignment.findOne({ title: assname }).populate("owner");

  // 없으면 NOT FOUND
  if (!ass) {
    return res
      .status(STATUS_CODE.NOT_FOUND_CODE)
      .render(BASE_PUG_PATH + "root/not-found", {
        type: "과제나 수행",
      });
  }

  const subjectOfAss = ass.subject;
  let subject;

  for (let i = 0; i < subjectInfo.length; i++) {
    const element = subjectInfo[i];
    if (String(element.englishName) === String(subjectOfAss)) {
      subject = element;
    }
  }

  return res.render(ASS_PUG_PATH + "watch", {
    ass,
    subject,
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
    body: {
      title,
      subject,
      content,
      fromMonth,
      fromDay,
      fromClass,
      toMonth,
      toDay,
      toClass,
    },
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

  // check
  try {
    if (
      4 <= Number(fromMonth) <= 12 &&
      4 <= Number(toMonth) <= 12 &&
      1 <= Number(fromDay) <= 31 &&
      1 <= Number(toDay) <= 31 &&
      1 <= Number(fromClass) <= 7 &&
      1 <= Number(toClass) <= 7
    ) {
    } else {
      return res.render(ASS_PUG_PATH + "new", {
        errorMessage: "유효한 일자를 넣어주시기 바랍니다.",
      });
    }
  } catch (error) {
    return res.render(ASS_PUG_PATH + "new", {
      errorMessage: `Server Error : ${error.__msg}`,
    });
  }

  // 아니면, 업데이트
  try {
    console.log("Hello");
    const updatedAss = await Assignment.findByIdAndUpdate(ass._id, {
      content,
      title,
      subject,
      deadLine: {
        from: {
          month: fromMonth,
          day: fromDay,
          class: fromClass,
        },
        to: {
          month: toMonth,
          day: toDay,
          class: toClass,
        },
      },
    });

    console.log(updatedAss);
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

// Development Completed ✅
export const getDeleteAss = async (req, res) => {
  const {
    params: { assname },
  } = req;

  // Assname 과 같은 Assignment 찾기
  const ass = await Assignment.findOne({ title: assname });

  // 없으면 NOT FOUND
  if (!ass) {
    return res
      .status(STATUS_CODE.NOT_FOUND_CODE)
      .render(BASE_PUG_PATH + "root/not-found", {
        type: "과제나 수행",
      });
  }

  // 있으면 본인 확인
  if (String(ass.owner._id) !== req.session.loggedInUser._id) {
    return res
      .status(STATUS_CODE.NOT_ACCEPTABLE_CODE)
      .render(BASE_PUG_PATH + "root/not-allow");
  }

  return res.render(ASS_PUG_PATH + "delete", {
    ass,
  });
};

export const postDeleteAss = async (req, res) => {
  const {
    params: { assname },
    body: { check },
  } = req;

  const ass = await Assignment.findOne({ title: assname });

  if (!ass) {
    return res
      .status(STATUS_CODE.NOT_FOUND_CODE)
      .render(BASE_PUG_PATH + "root/not-found", {
        type: "과제나 수행",
      });
  }

  if (!check === assname) {
    return res
      .status(STATUS_CODE.BAD_REQUEST_CODE)
      .render(ASS_PUG_PATH + "delete", {
        ass,
      });
  }

  // 있으면 Delete
  try {
    const deletedAss = await Assignment.findOneAndDelete({ title: assname });
    console.log(`DELETE : ${deletedAss}`);
    return res.status(STATUS_CODE.UPDATED_CODE).redirect("/assignment");
  } catch (error) {
    return res
      .status(STATUS_CODE.BAD_REQUEST_CODE)
      .render(ASS_PUG_PATH + "delete", {
        ass,
        errorMessage: `DB Error : ${error}`,
      });
  }
};

export const getSaveAss = (req, res) => {
  return res.redirect("/assignment/new");
};
