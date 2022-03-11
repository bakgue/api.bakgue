import mongoose from "mongoose";
import bcrypt from "bcrypt";

const studentSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
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
  },
  number: {
    type: Number,
    required: true,
    minlength: 6,
    maxlength: 6,
    min: 20201,
    max: 20231,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
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
});

studentSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 5);
});

const Student = mongoose.model("Student", studentSchema);

export default Student;
