import mongoose from "mongoose";
const TestCaseSchema = mongoose.Schema({
  input: {
    type: String,
    required: true,
  },
  expectedOutput: {
    type: String,
    required: true,
  },
});
const TestCasesSchema = mongoose.Schema({
  questionId: {
    type: String,
    ref: "question",
    required: true,
  },
  testcases: [TestCaseSchema],
});
const TestCases =
  mongoose.models.testcases || mongoose.model("testcases", TestCasesSchema);
export default TestCases;
