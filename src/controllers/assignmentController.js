import { STATUS_CODE } from "./rootController";
import { BASE_PUG_PATH } from "./rootController";

import subjectInfo from "../../json/subject.json";

import Assignment from "../model/Assignment";
import Student from "../model/Student";

const ASS_PUG_PATH = BASE_PUG_PATH + "assignment/";

export const getAss = async (req, res) => {
  const assInDB = await Assignment.find({});
  let asss = JSON.parse(JSON.stringify(assInDB));

  for (let i = 0; i < asss.length; i++) {
    const ass = asss[i];
    const subject = subjectInfo[ass.subject];
    asss[i].createdAt = new Date(ass.createdAt);
    asss[i].subject = subject;
  }

  console.log(asss);
  return res.render(ASS_PUG_PATH + "home", {
    asss,
  });
};

export const getNewAss = (req, res) => {
  return res.render(ASS_PUG_PATH + "new");
};

export const postNewAss = async (req, res) => {
  const {
    body: { title, subject, deadLine },
  } = req;

  const sameTitleAss = await Assignment.findOne({ title });

  if (sameTitleAss) {
    return res
      .status(STATUS_CODE.ALEADY_TAKEN_CODE)
      .render(ASS_PUG_PATH + "new", {
        errorMessage: "이미 존재하는 이름입니다. 다른 이름으로 바꾸세요.",
      });
  }

  try {
    const createdAssignment = await Assignment.create({
      title,
      subject,
      deadLine,
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

export const watchAss = async (req, res) => {
  const {
    params: { assname },
  } = req;

  const ass = await Assignment.findOne({ title: assname }).populate("owner");

  if (!ass) {
    return res
      .status(STATUS_CODE.NOT_FOUND_CODE)
      .render(BASE_PUG_PATH + "root/not-found", {
        type: "과제나 수행",
      });
  }

  const subject = subjectInfo[ass.subject];

  return res.render(ASS_PUG_PATH + "watch", {
    ass,
    subject,
  });
};

export const getEditAss = async (req, res) => {
  const {
    params: { assname },
  } = req;

  const ass = await Assignment.findOne({ title: assname });
  if (!ass) {
    return res
      .status(STATUS_CODE.NOT_FOUND_CODE)
      .render(BASE_PUG_PATH + "root/not-found", {
        type: "과제나 시험",
      });
  }

  if (String(ass.owner._id) !== String(req.session.loggedInUser._id)) {
    return res
      .status(STATUS_CODE.NOT_ACCEPTABLE_CODE)
      .render(BASE_PUG_PATH + "root/not-allow");
  }

  return res.render(ASS_PUG_PATH + "edit", {
    ass,
  });
};

export const postEditAss = async (req, res) => {
  const {
    params: { assname },
    body: { title, subject, content, deadLine },
  } = req;

  const ass = await Assignment.findOne({ title: assname });

  if (String(ass.owner._id) !== String(req.session.loggedInUser._id)) {
    return res
      .status(STATUS_CODE.NOT_ACCEPTABLE_CODE)
      .render(BASE_PUG_PATH + "root/not-allow");
  }

  const sameTitleAss = await Assignment.findOne({ title });

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

  try {
    const updatedAss = await Assignment.findByIdAndUpdate(ass._id, {
      content,
      title,
      subject,
      deadLine,
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

export const getDeleteAss = async (req, res) => {
  const {
    params: { assname },
  } = req;

  const ass = await Assignment.findOne({ title: assname });

  if (!ass) {
    return res
      .status(STATUS_CODE.NOT_FOUND_CODE)
      .render(BASE_PUG_PATH + "root/not-found", {
        type: "과제나 수행",
      });
  }

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
