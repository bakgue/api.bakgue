import mongoose from "mongoose";

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
	owner: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Student",
		required: true,
	},
	issues: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Issue",
		},
	],
});

const Assignment = mongoose.model("Assignment", assignmentSchema);

export default Assignment;
