import mongoose from "mongoose";
import bcrypt from "bcrypt";

const studentSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		minlength: 1,
		maxlength: 20,
		trim: true,
		unique: true,
	},
	name: {
		type: String,
		required: true,
		minlength: 2,
		maxlength: 3,
		trim: true,
		unique: true,
	},
	number: {
		type: Number,
		required: true,
		minlength: 6,
		maxlength: 6,
		min: 20200,
		max: 20232,
		trim: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	bio: {
		type: String,
		maxlength: 50,
		required: false,
	},
	key: {
		type: String,
		required: true,
	},
	createdAssignments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Assignment",
		},
	],
	savedAssignments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Assignment",
		},
	],
	createdIssues: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Issue",
		},
	],
});

studentSchema.pre("save", async function () {
	if (this.isModified("password")) {
		this.password = await bcrypt.hash(this.password, 5);
	}
});

const Student = mongoose.model("Student", studentSchema);

export default Student;
