import DBConnection from '@/app/lib/db';
import User from '@/app/models/user';
import verifyUserEmail from '@/app/services/verifyUserEmail';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export async function POST(request) {
	const userObj = await request.json();
	const { name, email, password } = userObj;
	try {
		await DBConnection();
		const hash = await bcrypt.hash(password, 5);
		const newuser = {
			...userObj,
			password: hash,
		};
		const user = await User.create(newuser);
		//generate verification token
		const token = jwt.sign({ name }, process.env.SECRET_KEY, { expiresIn: '24h' });
		//send verification link to users email
		verifyUserEmail(name, email, token);
		return NextResponse.json('Created User Successfully 🎉');
	} catch (error) {
		console.log(error.message);
		return NextResponse.error(error.message);
	}
}
