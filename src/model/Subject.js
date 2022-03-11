import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  zoom: {
    zoomLink: {
      type: String,
      required: true,
    },
    zoomId: [
      {
        type: Number,
        required: true,
        minlength: 3,
        maxlength: 4,
      },
    ],
    zoomPassword: {
      type: String,
      required: true,
    },
  },
  googleClassroomLink: {
    type: String,
    required: true,
  },
  teacher: {
    type: String,
    required: true,
  },
});

const Subject = mongoose.model("Subject", subjectSchema);

export default Subject;
