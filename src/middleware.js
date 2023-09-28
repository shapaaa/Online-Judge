import { NextResponse } from "next/server";
import verifyJwt from "./app/services/verifyJwt";
export const config = {
  matcher: "/api/:function*",
};
// This function can be marked `async` if using `await` inside
export async function middleware(request) {
  const jwt = request.cookies?.get("jwt");
  const { pathname } = request.nextUrl;
  if (
    ((pathname == "/api/login" || pathname == "/api/register") && !jwt) ||
    pathname === "/api/logout"
  ) {
    return NextResponse.next();
  }
  try {
    const { value: token } = jwt;
    const result = await verifyJwt(token);
    return NextResponse.next();
  } catch (error) {
    return NextResponse.error(error.message);
  }
}
