import DBConnection from "@/app/lib/db";
import TestCases from "@/app/models/testcases";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await DBConnection();
    const testCases = await request.json();
    const result = await TestCases.create(testCases);
    return NextResponse.json("TestCases added Successfully 🎉");
  } catch (error) {
    return NextResponse.json(error.message);
  }
}
