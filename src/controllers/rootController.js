import Student from "../model/Student";

import bcrypt from "bcrypt";
import studentInfo from "../../json/student.json";

export const BASE_PUG_PATH = "../views/";
const ROOT_PUG_PATH = BASE_PUG_PATH + "root/";

export const STATUS_CODE = {
	OK_CODE: 200,
	CREATED_CODE: 201,
	UPDATED_CODE: 204,
	FOUND_CODE: 302,
	BAD_REQUEST_CODE: 400,
	NOT_FOUND_CODE: 404,
	NOT_ACCEPTABLE_CODE: 405,
	ALEADY_TAKEN_CODE: 409,
};

export const getHome = (req, res) => {
	return res.render(ROOT_PUG_PATH + "home");
};

export const getSignup = (req, res) => {
	return res.render(ROOT_PUG_PATH + "signup");
};

export const postSignup = async (req, res) => {
	const {
		body: {
			key,
			grad,
			classOne,
			classTwo,
			idOne,
			idTwo,
			name,
			username,
			password,
			confirmPassword,
		},
	} = req;

	if (key !== process.env.CLIENT_KEY) {
		return res
			.status(STATUS_CODE.BAD_REQUEST_CODE)
			.render(ROOT_PUG_PATH + "signup", {
				errorMessage: "Key 가 일치하지 않습니다.",
			});
	}

	if (password !== confirmPassword) {
		return res
			.status(STATUS_CODE.BAD_REQUEST_CODE)
			.render(ROOT_PUG_PATH + "signup", {
				errorMessage: "비밀번호가 일치하지 않습니다.",
			});
	}

	const studentId = `${grad}${classOne}${classTwo}${idOne}${idTwo}`;
	const studentName = name;

	const isExists = studentInfo[studentId];
	if (!isExists) {
		return res
			.status(STATUS_CODE.BAD_REQUEST_CODE)
			.render(ROOT_PUG_PATH + "signup", {
				errorMessage:
          "해당 반 번호와 이름이 서로 일치하는 것이 없습니다. 자신의 반 번호와 이름으로 다시 시도해 주시기 바랍니다.",
			});
	}

	const sameIdStudent = await Student.findOne({ number: studentId });
	const sameUsernameStudent = await Student.findOne({ username });

	if (sameIdStudent || sameUsernameStudent) {
		return res
			.status(STATUS_CODE.BAD_REQUEST_CODE)
			.render(ROOT_PUG_PATH + "signup", {
				errorMessage:
          "입력하신 정보의 학생은 이미 회원가입된 상태 입니다. 혹시 회원가입을 하지 않으셨습니까? 그렇다면, bak.gue.service@gmail.com 으로 문의해 주시기 바랍니다.",
			});
	}

	try {
		const createdStudent = await Student.create({
			username,
			password,
			key,
			name: studentName,
			number: studentId,
		});
		console.log(`SIGNUP : ${createdStudent}`);
		return res.status(STATUS_CODE.CREATED_CODE).redirect("/signin");
	} catch (error) {
		return res
			.status(STATUS_CODE.BAD_REQUEST_CODE)
			.render(ROOT_PUG_PATH + "signup", {
				errorMessage: `DataBase Error : ${error}`,
			});
	}
};

export const getSignin = (req, res) => {
	return res.render(ROOT_PUG_PATH + "signin");
};

export const postSignin = async (req, res) => {
	const {
		body: { grad, classOne, classTwo, idOne, idTwo, name, password },
	} = req;

	const studentId = `${grad}${classOne}${classTwo}${idOne}${idTwo}`;
	const studentName = name;

	const isExists = studentInfo[studentId].name == studentName;
	if (!isExists) {
		return res
			.status(STATUS_CODE.BAD_REQUEST_CODE)
			.render(ROOT_PUG_PATH + "signin", {
				errorMessage: `${studentName} 학생은 저희 반에 없습니다.`,
			});
	}

	const student = await Student.findOne({
		number: studentId,
		name: studentName,
	});

	if (!student) {
		return res
			.status(STATUS_CODE.BAD_REQUEST_CODE)
			.render(ROOT_PUG_PATH + "signin", {
				errorMessage: "계정을 찾지 못했습니다. 다시 입력해 주시기 바랍니다.",
			});
	}

	const comparePassword = await bcrypt.compare(password, student.password);

	if (!comparePassword) {
		return res
			.status(STATUS_CODE.BAD_REQUEST_CODE)
			.render(ROOT_PUG_PATH + "signin", {
				errorMessage: "비밀번호가 맞지 않습니다.",
			});
	}

	req.session.loggedIn = true;
	req.session.loggedInUser = student;

	res.locals.loggedIn = true;
	res.locals.loggedInUser = student;

	console.log(`SIGNIN : ${student}`);
	return res.redirect("/");
};

export const logout = (req, res) => {
	req.session.destroy();
	return res.redirect("/");
};
