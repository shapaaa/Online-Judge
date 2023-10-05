import Link from "next/link";
import getAuthenticatedUser from "../lib/getAuthenticatedUser";
import Logout from "./Logout";

const Header = async () => {
  const result = await getAuthenticatedUser();
  return (
    <header className="mb-[30px] flex h-[50px] items-center justify-evenly border-b text-blue-600 ">
      <div className="grow">
        <Link href="/">
          <h1 className="text-center font-medium">Online Judge</h1>
        </Link>
      </div>
      <nav className="grow">
        <ul className="flex justify-center gap-5">
          {result.ok ? (
            <>
              <li>
                <Link href="/profile">Hello, {result.user.name}</Link>
              </li>
              <li>
                <Logout />
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/login">Sign In</Link>
              </li>
              <li>
                <Link href="/register">Register</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
