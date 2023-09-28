import { cookies } from "next/headers";
import User from "../models/user";
import verifyJwt from "../services/verifyJwt";

const getAuthenticatedUser = async () => {
  try {
    const { value: token } = cookies().get("jwt");
    const { email } = await verifyJwt(token);
    const user = await User.findOne({ email });
    return { ok: true, user };
  } catch (error) {
    return { ok: false, error: error.message };
  }
};
export default getAuthenticatedUser;
