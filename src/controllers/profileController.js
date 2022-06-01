import { BASE_PUG_PATH } from "./rootController";

import Student from "../model/Student";
import subjectInfo from "../../json/subject.json";

const PROFILE_PUG_PATH = BASE_PUG_PATH + "profile/";

export const getProfile = async (req, res) => {
	const {
		session: { loggedInUser },
	} = req;

	const userProfile = JSON.parse(
		JSON.stringify(
			await Student.findById(loggedInUser._id)
				.populate("createdAssignments")
				.populate("savedAssignments")
				.populate({
					path: "createdIssues",
					populate: {
						path: "owner",
					},
				})
		)
	);

	for (let i = 0; i < userProfile.createdAssignments.length; i++) {
		const createdAssignment = userProfile.createdAssignments[i];

		const subject = subjectInfo[String(createdAssignment.subject)];
		userProfile.createdAssignments[i].subject = subject;
	}

	for (let i = 0; i < userProfile.savedAssignments.length; i++) {
		const savedAssignment = userProfile.savedAssignments[i];

		const subject = subjectInfo[String(savedAssignment.subject)];
		userProfile.savedAssignments[i].subject = subject;
	}

	return res.render(PROFILE_PUG_PATH + "home", {
		userProfile,
	});
};
