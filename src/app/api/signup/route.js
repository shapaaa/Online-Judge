import DBConnection from '@/app/lib/db';
import User from '@/app/models/user';
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';

export async function POST(request) {
	const userObj = await request.json();
	try {
		await DBConnection();
		const hash = await bcrypt.hash(userObj.password, 5);
		const createdat = Date.now();
		const newuser = {
			...userObj,
			password: hash,
		};
		console.log(newuser);
		const user = await User.create(newuser);
		console.log(user);
		return NextResponse.json('Created User Successfully 🎉');
	} catch (error) {
		console.log(error.message);
		return NextResponse.error(error.message);
	}
}
