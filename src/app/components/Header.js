import Link from "next/link";
import getAuthenticatedUser from "../lib/getAuthenticatedUser";
import Logout from "./Logout";

const Header = async () => {
  const result = await getAuthenticatedUser();
  return (
    <header className="flex h-20 items-center justify-evenly bg-slate-300">
      <div className="grow">
        <h1 className="text-center">Online Judge</h1>
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
