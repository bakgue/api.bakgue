// import { STATUS_CODE } from "./rootController";
import { BASE_PUG_PATH } from "./rootController";

import Student from "../model/Student";

const PROFILE_PUG_PATH = BASE_PUG_PATH + "profile/";

export const getProfile = async (req, res) => {
	const {
		session: { loggedInUser },
	} = req;

	const userProfile = await Student.findById(loggedInUser._id);

	return res.render(PROFILE_PUG_PATH + "home", {
		userProfile,
	});
};
