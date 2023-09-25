import { getQuestions } from "@/app/lib/getQuestions";

const page = async ({ params: { slug } }) => {
  const questions = await getQuestions();
  const question = questions.find(
    (question) => question.title.toLowerCase().replaceAll(" ", "-") === slug,
  );
  const { title, description, difficulty } = question;
  return (
    <article>
      <h1>{title}</h1>
      <div>{difficulty}</div>
      <div>{description}</div>
    </article>
  );
};

export default page;
