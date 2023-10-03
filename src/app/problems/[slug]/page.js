import { getQuestions } from "@/app/lib/getQuestions";
import EditorPanel from "./components/EditorPanel";

const page = async ({ params: { slug } }) => {
  const questions = await getQuestions();
  const question = questions.find(
    (question) => question.title.toLowerCase().replaceAll(" ", "-") === slug,
  );
  const { _id, title, description, difficulty } = question;
  return (
    <div>
      <article>
        <h1>{title}</h1>
        <div>{difficulty}</div>
        <div>{description}</div>
      </article>
      <EditorPanel questionId={_id} />
    </div>
  );
};

export default page;
