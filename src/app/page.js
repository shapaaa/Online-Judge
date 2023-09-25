import Link from "next/link";
import Header from "./components/Header";
import { getQuestions } from "./lib/getQuestions";
import ProblemsTable from "./components/ProblemsTable";

export default async function Page() {
  const questions = await getQuestions();

  return (
    <div>
      <Header />
      <ProblemsTable data={questions} />
    </div>
  );
}
