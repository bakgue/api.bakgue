import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  number: {
    type: Number,
    required: true,
    minlength: 6,
    maxlength: 6,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 3,
    trim: true,
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

const Student = mongoose.model("Student", studentSchema);

export default Student;
