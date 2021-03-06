import Assignment from "../model/Assignment";
import Student from "../model/Student";
import Issue from "../model/Issues";

import { STATUS_CODE } from "./rootController";
import { async } from "regenerator-runtime";

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

		const updatedAssignment = await Assignment.findByIdAndUpdate(sameAss._id, {
			$push: {
				issues: createdIssue._id,
			},
		});

		const updatedUser = await Student.findByIdAndUpdate(loggedInUser._id, {
			$push: {
				createdIssues: createdIssue._id,
			},
		});

		return res.sendStatus(STATUS_CODE.OK_CODE);
	} catch (error) {
		console.log(error);
		return res.sendStatus(STATUS_CODE.BAD_REQUEST_CODE);
	}
};

export const postEditProfile = async (req, res) => {
	let {
		params: { username, bio },
		session: { loggedInUser },
	} = req;

	if (username.length === 0 || username.length > 20 || bio.length > 50) {
		return res.sendStatus(STATUS_CODE.NOT_ACCEPTABLE_CODE);
	}

	if (bio === "false") {
		bio = "";
	}

	try {
		const updatedUser = await Student.findByIdAndUpdate(loggedInUser._id, {
			username,
			bio,
		});

		return res.sendStatus(STATUS_CODE.OK_CODE);
	} catch (error) {
		console.log(error);
		return res.sendStatus(STATUS_CODE.BAD_REQUEST_CODE);
	}
};
