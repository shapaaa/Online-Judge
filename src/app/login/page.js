import { redirect } from "next/navigation";
import getAuthenticatedUser from "../lib/getAuthenticatedUser";
import Login from "./components/Login";
const LoginPage = async () => {
  const result = await getAuthenticatedUser();
  if (result.ok) redirect("/");
  return <Login />;
};

export default LoginPage;
