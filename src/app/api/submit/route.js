import DBConnection from "@/app/lib/db";
import Submission from "@/app/models/submission";
import TestCase from "@/app/models/testcase";
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { questionId, language, program } = await request.json();
  await DBConnection();

  const testcases = await TestCase.find({ questionId });
  const inputs = testcases.map(({ input }) => input);

  let verdict = "",
    success = true;
  const submission = {
    userId: "64fc795f1e862a8ac3956204",
    questionId: "6509ada16d386922abe9a272",
    program,
    language,
  };

  try {
    const { data } = await axios.post("http://localhost:3000/api/run", {
      inputs,
      language,
      program,
    });
    const { result: outputs } = data;
    for (let i = 0; i < outputs.length; i++) {
      if (outputs[i].trimEnd("\n") !== testcases[i].expectedOutput) {
        verdict = `Wrong Answer on TestCase${i + 1}`;
        success = false;
        break;
      }
    }
    if (success) verdict = `Success:Passed All TestCases 🎉`;
  } catch (error) {
    console.log(error.message);
    verdict = "Runtime Error";
    success = false;
  } finally {
    await Submission.create({ ...submission, verdict });
    return NextResponse.json({ verdict, success });
  }
}
