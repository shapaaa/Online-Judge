import { redirect } from "next/navigation";
import getAuthenticatedUser from "../lib/getAuthenticatedUser";
import Register from "./components/Register";

const RegisterPage = async () => {
  const result = await getAuthenticatedUser();
  if (result.ok) redirect("/");
  return <Register />;
};

export default RegisterPage;
