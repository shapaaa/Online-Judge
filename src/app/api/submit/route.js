import DBConnection from "@/app/lib/db";
import getAuthenticatedUser from "@/app/lib/getAuthenticatedUser";
import Submission from "@/app/models/submission";
import TestCases from "@/app/models/testcases";
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { questionId, language, program } = await request.json();
  const id = questionId.toLowerCase().replaceAll(" ", "-");
  await DBConnection();
  const { user } = await getAuthenticatedUser();
  const { testcases } = await TestCases.findOne({
    questionId: id,
  });
  const inputs = testcases.map(({ input }) => input);

  let verdict = "",
    success = true;
  const submission = {
    userId: user.name,
    questionId: id,
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
    verdict = "Runtime Error";
    success = false;
  } finally {
    await Submission.create({ ...submission, verdict });
    return NextResponse.json({ verdict, success });
  }
}
