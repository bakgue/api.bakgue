import mongoose from "mongoose";
import subjectInfo from "../../json/subject.json";

const assignmentSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		maxlength: 20,
		trim: true,
		unique: true,
	},
	subject: {
		type: String,
		required: true,
		default: "Class-Room",
	},
	content: {
		type: String,
		required: true,
		default: " ",
		maxlength: 2000,
	},
	createdAt: {
		type: Date,
		required: true,
		default: Date.now,
	},
	deadLine: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 35,
	},
	saveUsers: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Student",
		},
	],
	issues: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Issue",
		},
	],
	owner: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Student",
		required: true,
	},
});

assignmentSchema.static("replaceAllSubject", function () {
	this.subject = subjectInfo[String(this.subject)];
});

assignmentSchema.static("replaceSubject", function (assignments) {
	for (let i = 0; i < assignments.length; i++) {
		const assignment = assignments[i];

		assignments[i].subject = subjectInfo[String(assignment.subject)];
	}

	return assignments;
});

const Assignment = mongoose.model("Assignment", assignmentSchema);

export default Assignment;
