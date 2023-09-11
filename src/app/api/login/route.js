import DBConnection from "@/app/lib/db";
import User from "@/app/models/user";
import bcrypt from "bcrypt";
import { SignJWT } from "jose";
import { NextResponse } from "next/server";

export async function POST(request) {
  //Check if user is registered
  const userObj = await request.json();
  const { email, password } = userObj;

  try {
    await DBConnection();
    const user = await User.findOne({ email });
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return NextResponse.error({ error: "Enter correct password" });
    }
    //generate access token
    const iat = Math.floor(Date.now() / 1000);

    const token = await new SignJWT({ email })
      .setProtectedHeader({ alg: "HS256", typ: "JWT" })
      .setExpirationTime("24h")
      .setIssuedAt(iat)
      .setNotBefore(iat)
      .sign(new TextEncoder().encode(process.env.SECRET_KEY));

    //if yes set cookies with access token
    const response = NextResponse.json("Set cookie successfully");

    response.cookies.set({
      name: "jwt",
      value: token,
      maxAge: 60 * 60 * 24,
      httpOnly: true,
      sameSite: "strict",
    });
    return response;
  } catch (error) {
    console.log(error.message);
    return NextResponse.error(error.message);
  }
}
