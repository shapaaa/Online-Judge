import { getQuestions } from "@/app/lib/getQuestions";
import EditorPanel from "./components/EditorPanel";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import getAuthenticatedUser from "@/app/lib/getAuthenticatedUser";
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
  const result = await getAuthenticatedUser();
  return (
    <div className=" mb-[20px] flex h-[950px] justify-between gap-[10px] bg-slate-100 p-[10px] ">
      <article className="prose flex w-full flex-col gap-y-[10px] overflow-y-scroll rounded bg-white p-[20px]">
        <h1 className="mb-0 text-lg font-bold">{title}</h1>
        <div className={` font-semibold ${colors[difficulty]}`}>
          {difficulty}
        </div>
        {result.ok && (
          <Link
            className="mb-2 mr-2 w-fit rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white  focus:outline-none focus:ring-4 focus:ring-blue-300"
            href={`/problems/${slug}/submissions`}
          >
            My Submissions
          </Link>
        )}
        <div>
          <ReactMarkdown>{description}</ReactMarkdown>
        </div>
      </article>
      <EditorPanel result={result} questionId={title} />
    </div>
  );
};

export default page;
