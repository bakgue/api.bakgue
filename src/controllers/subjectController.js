import Assignment from "../model/Assignment";

import { STATUS_CODE } from "./rootController";
import { BASE_PUG_PATH } from "./rootController";

import subjectsInfo from "../../json/subject.json";

const SUBJECT_PUG_PATH = BASE_PUG_PATH + "subject/";

function toUppercaseOnlyFirstLetter(str) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

function removeDash(str) {
	return str.replace("-", " ");
}

export const getSubject = (req, res) => {
	// Subject Home Page 를 Rendering
	return res.render(SUBJECT_PUG_PATH + "home", {
		subjects: subjectsInfo,
	});
};

export const watchSubject = async (req, res) => {
	const {
		params: { subname },
	} = req;

	// JSON 에 Subname 에 해당하는 Subject 가 있는지 확인
	const isExists = subjectsInfo[subname];
	let subjectObj;

	// 없으면 NOT FOUND Page Rendering 함
	if (!isExists) {
		return res
			.status(STATUS_CODE.NOT_FOUND_CODE)
			.render(BASE_PUG_PATH + "root/not-found", {
				type: "과목",
			});
	} else {
		subjectObj = isExists;
	}

	const assInDB = await Assignment.find({
		subject: subjectObj.englishName,
	}).populate("owner");
	let assignments = JSON.parse(JSON.stringify(assInDB));

	for (let i = 0; i < assignments.length; i++) {
		const ass = assignments[i];
		assignments[i].createdAt = new Date(ass.createdAt);
		assignments[i].subject = subjectsInfo[ass.subject];
	}

	return res.render(SUBJECT_PUG_PATH + "watch", {
		pageTitle: `${removeDash(
			toUppercaseOnlyFirstLetter(subjectObj.englishName)
		)}`,
		pageDescription: `${subjectObj.name} 에 대한 정보입니다.`,
		subjectObj,
		assignments,
	});
};
