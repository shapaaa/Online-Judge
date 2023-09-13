import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
export const config = {
	matcher: '/api/:function*',
};
// This function can be marked `async` if using `await` inside
export async function middleware(request) {
	const { value: token } = request.cookies?.get('jwt');
	const { pathname } = request.nextUrl;
	if (pathname == '/api/login' && !token) {
		return NextResponse.next();
	}
	try {
		const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.SECRET_KEY));
		return NextResponse.next();
	} catch (error) {
		return NextResponse.json(error.message);
	}
}
