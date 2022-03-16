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
    ref: "Subject",
    required: true,
  },
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
  meta: {
    views: {
      type: Number,
      default: 0,
      min: 0,
      required: true,
    },
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
});

const Assignment = mongoose.model("Assignment", assignmentSchema);

export default Assignment;
