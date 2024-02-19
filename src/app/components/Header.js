import Link from "next/link";
import getAuthenticatedUser from "../lib/getAuthenticatedUser";
import Logout from "./Logout";

const Header = async () => {
  const result = await getAuthenticatedUser();
  return (
    <header className="flex h-[70px] items-center justify-around border-b ">
      <div>
        <Link href="/">
          <h1 className="text-xl font-light text-blue-700">Online Judge</h1>
        </Link>
      </div>
      <nav>
        <ul className="flex justify-center gap-5">
          {result.ok ? (
            <>
              {result.user.verified && (
                <li>
                  <Link
                    className="mb-2 mr-2 rounded-lg bg-blue-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-4  focus:ring-blue-300"
                    href="/addproblem"
                  >
                    Add Problem
                  </Link>
                </li>
              )}
              <li>
                <Link href="/profile">Hello, {result.user?.name}</Link>
              </li>
              <li>
                <Logout />
              </li>
            </>
          ) : (
            <div className="flex w-[310px] justify-end gap-[10px]">
              <li>
                <Link href="/login">Sign In</Link>
              </li>
              <li>
                <Link href="/register">Register</Link>
              </li>
            </div>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
