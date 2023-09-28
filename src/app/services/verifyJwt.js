import { jwtVerify } from "jose";

const verifyJwt = async (token) => {
  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.SECRET_KEY),
    );
    return payload;
  } catch (error) {
    throw new Error(error.message);
  }
};
export default verifyJwt;
