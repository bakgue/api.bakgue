import mongoose from "mongoose";

const issueSchema = new mongoose.Schema({
	content: {
		type: String,
		required: true,
		maxlength: 2000,
	},
	createdAt: {
		type: Date,
		required: true,
		default: Date.now,
	},
	owner: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Student",
		required: true,
	},
	assignment: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Assignment",
		required: true,
	},
});

const Issue = mongoose.model("Issue", issueSchema);

export default Issue;
