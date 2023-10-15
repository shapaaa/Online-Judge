import DBConnection from "@/app/lib/db";
import Question from "@/app/models/question";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await DBConnection();
    const questionObj = await request.json();
    const question = await Question.create(questionObj);
    return NextResponse.json({ question });
  } catch (error) {
    return NextResponse.json(error.message);
  }
}
