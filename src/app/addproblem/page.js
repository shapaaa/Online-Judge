import getAuthenticatedUser from "../lib/getAuthenticatedUser";
import NewProblemForm from "./components/NewProblemForm";
import { redirect } from "next/navigation";
const NewProblem = async () => {
  const result = await getAuthenticatedUser();

  if (!result.ok || !result.user.verified) redirect("/");
  return <NewProblemForm />;
};

export default NewProblem;
