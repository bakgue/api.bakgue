//import { STATUS_CODE } from "./rootController";
import { BASE_PUG_PATH } from "./rootController";

const PROFILE_PUG_PATH = BASE_PUG_PATH + "profile/";

export const getProfile = (req, res) => {
	return res.render(PROFILE_PUG_PATH + "home");
};
