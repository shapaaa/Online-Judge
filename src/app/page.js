import { getQuestions } from "./lib/getQuestions";
import ProblemsTable from "./components/ProblemsTable";

export default async function Page() {
  const questions = await getQuestions();

  return (
    <div>
      <ProblemsTable data={questions} />
    </div>
  );
}
