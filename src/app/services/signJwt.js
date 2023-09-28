import { SignJWT } from "jose";

const signJwt = async (email) => {
  const iat = Math.floor(Date.now() / 1000);
  const token = await new SignJWT({ email })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setExpirationTime("24h")
    .setIssuedAt(iat)
    .setNotBefore(iat)
    .sign(new TextEncoder().encode(process.env.SECRET_KEY));
  return token;
};
export default signJwt;
