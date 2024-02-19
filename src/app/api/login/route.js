import DBConnection from "@/app/lib/db";
import User from "@/app/models/user";
import signJwt from "@/app/services/signJwt";
import bcrypt from "bcrypt";
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
      return NextResponse.json({ error: "Enter correct password" });
    }
    //generate access token
    const token = await signJwt(email);

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
    return NextResponse.error(error.message);
  }
}
