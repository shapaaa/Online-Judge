import mongoose from 'mongoose';

const TestCaseSchema = mongoose.Schema({
	questionId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'question',
		required: true,
	},
	input: {
		type: String,
		required: true,
	},
	expectedOutput: {
		type: String,
		required: true,
	},
});
const TestCase = mongoose.models.testcase || mongoose.model('testcase', TestCaseSchema);
export default TestCase;
