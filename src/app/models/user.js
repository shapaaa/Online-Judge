import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true,
		max: 20,
	},
	email: {
		type: String,
		required: true,
		max: 100,
	},
	password: { type: String, required: true },
	verified: {
		type: Boolean,
		default: false,
	},
});
const User = mongoose.models.user || mongoose.model('user', UserSchema);
export default User;
