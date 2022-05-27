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
  emotion: {
    selected: {
      great: {
        type: Boolean,
        default: false,
      },
      smile: {
        type: Boolean,
        default: false,
      },
      heart: {
        type: Boolean,
        default: false,
      }
    },
    great: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
      },
    ],
    smile: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
      },
    ],
    heart: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
      },
    ],
  },
});

const Issue = mongoose.model("Issue", issueSchema);

export default Issue;
