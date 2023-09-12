import DBConnection from "@/app/lib/db";
import Question from "@/app/models/question";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    await DBConnection();
    const questions = await Question.find({});
    return NextResponse.json({
      questions,
    });
  } catch (error) {
    return NextResponse.json(error.message);
  }
}
