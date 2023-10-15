const mongoose = require("mongoose");

const SubmissionSchema = new mongoose.Schema({
  userId: {
    type: String,
    ref: "user",
    required: true,
  },
  questionId: {
    type: String,
    ref: "question",
    required: true,
  },
  program: {
    type: String,
    required: true,
  },
  language: String,
  timestamp: {
    type: Date,
    default: Date.now,
  },
  verdict: String,
});

const Submission =
  mongoose.models.submission || mongoose.model("submission", SubmissionSchema);

module.exports = Submission;
