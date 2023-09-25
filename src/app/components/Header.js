import Link from "next/link";

const Header = () => {
  return (
    <header className="flex h-20 items-center justify-evenly bg-slate-300">
      <div className="grow">
        <h1 className="text-center">Online Judge</h1>
      </div>
      <nav className="grow">
        <ul className="flex justify-center gap-5">
          <li>
            <Link href="/login">Sign In</Link>
          </li>
          <li>
            <Link href="/register">Register</Link>
          </li>
          <li>
            <Link href="/profile">Profile</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
