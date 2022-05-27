import Assignment from "../model/Assignment";
import Student from "../model/Student";
import Issue from "../model/Issues";

import {STATUS_CODE} from "./rootController";
import {async} from "regenerator-runtime";
import flash from "express-flash";

export const postSaveAss = async (req, res) => {
  const {
    params: { assname },
    session: { loggedInUser },
  } = req;

  const ass = await Assignment.findOne(
    { title: assname },
    {
      saveUsers: true,
    }
  );

  if (!ass) {
    return res.sendStatus(STATUS_CODE.NOT_FOUND_CODE);
  }

  const user = await Student.findById(loggedInUser._id, {
    savedAssignments: true,
  });

  ass.saveUsers.push(user._id);
  user.savedAssignments.push(ass._id);

  await ass.save();
  await user.save();

  return res.sendStatus(STATUS_CODE.OK_CODE);
};

export const postCancelSaveAss = async (req, res) => {
  const {
    params: { assname },
    session: { loggedInUser },
  } = req;

  const ass = await Assignment.findOne(
    { title: assname },
    {
      saveUsers: true,
    }
  );

  if (!ass) {
    return res.sendStatus(STATUS_CODE.NOT_FOUND_CODE);
  }

  const user = await Student.findById(loggedInUser._id, {
    savedAssignments: true,
  });

  console.log(ass.saveUsers, user.savedAssignments);
  ass.saveUsers.remove(user._id);
  user.savedAssignments.remove(ass._id);

  await ass.save();
  await user.save();

  return res.sendStatus(STATUS_CODE.OK_CODE);
};

export const postCheckSaveAss = async (req, res) => {
  const {
    params: { assname },
    session: { loggedInUser },
  } = req;

  const user = await Student.findById(loggedInUser._id, {
    savedAssignments: true,
  });

  const ass = await Assignment.findOne(
    { title: assname },
    {
      _id: true,
    }
  );

  for (let i = 0; i < user.savedAssignments.length; i++) {
    const element = user.savedAssignments[i];
    if (String(ass._id) === String(element._id)) {
      return res.status(STATUS_CODE.OK_CODE).json({ isSaved: true });
    }
  }

  return res.status(STATUS_CODE.OK_CODE).json({ isSaved: false });
};

export const postAddIssues = async (req, res) => {
  const {
    params: { assname, content },
    session: { loggedInUser },
  } = req;

  const sameAss = await Assignment.findOne({ title: assname });

  if (!sameAss) {
    return res.sendStatus(STATUS_CODE.NOT_FOUND_CODE);
  }

  try {
    const createdIssue = await Issue.create({
      content,
      assignment: sameAss._id,
      owner: loggedInUser._id,
    });

    sameAss.issues.push(createdIssue._id);
    await sameAss.save();

    console.log(`CREATE ISSUE : ${createdIssue}`);
  } catch (error) {
    console.log(`ERROR : ${error}`);
    return res.sendStatus(STATUS_CODE.BAD_REQUEST_CODE)
  }

  return res.sendStatus(STATUS_CODE.OK_CODE);
}
<<<<<<< Updated upstream
=======

export const postAddEmotion = async (req, res) => {
  const {
    params: { assname, issueId, type },
    session: { loggedInUser },
  } = req;

  const sameAss = await Assignment.findOne({ title : assname }).populate({
    path: "issues",
    populate: {
      path: "emotion",
    }
  });

  let sameIssue;

  for (let i = 0; i < sameAss.issues.length; i++) {
    const issue = sameAss.issues[i];
    if (String(issue._id) === String(issueId)) {
      sameAss.issues[i].emotion.selected[String(type)] = true;
      sameAss.issues[i].emotion[String(type)].push(loggedInUser._id);
      sameIssue = await Issue.findById(issue._id);
      sameIssue.emotion.selected[String(type)] = true;
      sameIssue.emotion[String(type)].push(loggedInUser._id);
    }
  }

  try {
    const savedAss = await sameAss.save();
    const savedIssue = await sameIssue.save();
    console.log(`SAVE ASSIGNMENT : ${savedAss}`);
    console.log(`SAVE ISSUE : ${savedIssue}`);
  } catch (error) {
    console.log(`ERROR: ${error}`);
    return res.sendStatus(STATUS_CODE.BAD_REQUEST_CODE)
  }
}

export const postDeleteEmotion = async (req, res) => {
  const {
    params: { assname, issueId, type },
  } = req;

  const sameAss = await Assignment.findOne({ title : assname }).populate({
    path: "issues",
    populate: {
      path: "emotion",
    },
  });

  let sameIssue;

  for (let i = 0; i < sameAss.issues.length; i++) {
    const issue = sameAss.issues[i];
    if (String(issue._id) === String(issueId)) {
      sameAss.issues[i].emotion.selected[String(type)] = true;
      sameAss.issues[i].emotion[String(type)].filter(function(ele) {
        return ele != value;
      });
      sameIssue = await Issue.findById(issue._id);
      sameIssue.emotion.selected[String(type)] = true;
      sameIssue.emotion[String(type)].filter(function(ele) {
        return ele != loggedInUser._id;
      });
    }
  }
 
  try {
    const savedAss = await sameAss.save();
    const savedIssue = await sameIssue.save();
    console.log(`SAVE ASSIGNMENT : ${savedAss}`);
    console.log(`SAVE ISSUE : ${savedIssue}`);
  } catch (error) {
    console.log(`ERROR: ${error}`);
    return res.sendStatus(STATUS_CODE.BAD_REQUEST_CODE)
  }

  return res.sendStatus(STATUS_CODE.OK_CODE);
}
>>>>>>> Stashed changes
