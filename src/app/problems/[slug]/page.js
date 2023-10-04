import { getQuestions } from "@/app/lib/getQuestions";
import EditorPanel from "./components/EditorPanel";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
const text = `Given two integers dividend and divisor, divide two integers without using multiplication, division, and mod operator.

The integer division should truncate toward zero, which means losing its fractional part. For example, 8.345 would be truncated to 8, and -2.7335 would be truncated to -2.

Return the quotient after dividing dividend by divisor.

Note: Assume we are dealing with an environment that could only store integers within the 32-bit signed integer range: [−231, 231 − 1]. For this problem, if the quotient is strictly greater than 231 - 1, then return 231 - 1, and if the quotient is strictly less than -231, then return -231.

 

Example 1:

Input: dividend = 10, divisor = 3
Output: 3
Explanation: 10/3 = 3.33333.. which is truncated to 3.
Example 2:

Input: dividend = 7, divisor = -3
Output: -2
Explanation: 7/-3 = -2.33333.. which is truncated to -2.
 

Constraints:

-231 <= dividend, divisor <= 231 - 1
divisor != 0`;
const page = async ({ params: { slug } }) => {
  const questions = await getQuestions();
  const question = questions.find(
    (question) => question.title.toLowerCase().replaceAll(" ", "-") === slug,
  );
  const { _id, title, description, difficulty } = question;
  const colors = {
    Hard: "text-red-600",
    Medium: "text-yellow-600",
    Easy: "text-green-600",
  };
  return (
    <div className="mx-[20px] flex gap-[10px] ">
      <article className="flex w-5/12 flex-col gap-y-[10px]">
        <h1 className="text-lg font-bold">{title}</h1>
        <div className={` font-semibold ${colors[difficulty]}`}>
          {difficulty}
        </div>
        <Link
          className="mb-2 mr-2 w-fit rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white  focus:outline-none focus:ring-4 focus:ring-blue-300"
          href="/submissions"
        >
          My Submissions
        </Link>
        <div>
          <ReactMarkdown>{text}</ReactMarkdown>
        </div>
      </article>
      <EditorPanel questionId={title} />
    </div>
  );
};

export default page;
