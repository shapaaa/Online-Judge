import getAuthenticatedUser from "../lib/getAuthenticatedUser";
import NewProblemForm from "./components/NewProblemForm";
import { redirect } from "next/navigation";
const NewProblem = async () => {
  const result = await getAuthenticatedUser();
  if (!result.ok) redirect("/");
  return <NewProblemForm />;
};

export default NewProblem;
