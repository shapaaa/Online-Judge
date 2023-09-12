import mongoose from "mongoose";

const QuestionSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    max: 110,
  },
  description: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    required: true,
  },
  createdat: { type: Date, default: Date.now() },
});
const Question =
  mongoose.models.question || mongoose.model("question", QuestionSchema);
export default Question;
