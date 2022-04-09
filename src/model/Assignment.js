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
    from: {
      month: {
        type: Number,
        min: 4,
        max: 12,
        required: true,
      },
      day: {
        type: Number,
        min: 1,
        max: 31,
        required: true,
      },
      class: {
        type: Number,
        min: 1,
        max: 7,
        required: true,
      },
    },
    to: {
      month: {
        type: Number,
        min: 4,
        max: 12,
        required: true,
      },
      day: {
        type: Number,
        min: 1,
        max: 31,
        required: true,
      },
      class: {
        type: Number,
        min: 1,
        max: 7,
        required: true,
      },
    },
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
