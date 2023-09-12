import DBConnection from "@/app/lib/db";
import Question from "@/app/models/question";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const { id } = params;
  try {
    await DBConnection();
    const update = await request.json();
    const updatedQuestion = await Question.findByIdAndUpdate(id, update);
    return NextResponse.json("Question updated Successfully 🎉");
  } catch (error) {
    return NextResponse.json(error.message);
  }
}

export async function DELETE(request, { params }) {
  const { id } = params;
  try {
    await DBConnection();
    await Question.findByIdAndDelete(id);
    return NextResponse.json("Question deleted Successfully 🎉");
  } catch (error) {
    return NextResponse.json(error.message);
  }
}
export async function GET(request, { params }) {
  const { id } = params;
  try {
    await DBConnection();
    const question = await Question.findById(id);
    return NextResponse.json({
      question,
    });
  } catch (error) {
    return NextResponse.json(error.message);
  }
}
