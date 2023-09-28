import { NextResponse } from "next/server";
import User from "@/app/models/user";
import DBConnection from "@/app/lib/db";
import verifyJwt from "@/app/services/verifyJwt";
export async function POST(req) {
  const verificationObj = await req.json();
  const { name, token } = verificationObj;
  try {
    await DBConnection();
    const result = verifyJwt(token);
    const updatedUser = await User.findOneAndUpdate(
      { name },
      {
        verified: true,
      },
    );
    return NextResponse.json("Success 🎉");
  } catch (error) {
    console.log(error.message);
    return NextResponse.json("Error ");
  }
}
