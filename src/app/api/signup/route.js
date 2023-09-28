import DBConnection from "@/app/lib/db";
import User from "@/app/models/user";
import signJwt from "@/app/services/signJwt";
import verifyUserEmail from "@/app/services/verifyUserEmail";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(request) {
  const userObj = await request.json();
  const { name, email, password } = userObj;
  try {
    await DBConnection();
    //hash password with salt by defautl bcrypt does it
    const hash = await bcrypt.hash(password, 5);
    const newuser = {
      ...userObj,
      password: hash,
    };
    //save new user in db
    const user = await User.create(newuser);
    //send verification link to users email
    verifyUserEmail(name, email);

    //send json token in cookie to verify if user is authenticated(signed up/logged in)
    const token = await signJwt(email);
    const response = NextResponse.json("Created User Successfully 🎉");
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
