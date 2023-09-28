import mongoose from "mongoose";

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
    unique: true,
  },
  password: { type: String, required: true },
  verified: {
    type: Boolean,
    default: false,
  },
  createdat: { type: Date, default: Date.now() },
});
const User = mongoose.models.user || mongoose.model("user", UserSchema);
export default User;
