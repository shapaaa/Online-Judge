import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import User from '@/app/models/user';
import DBConnection from '@/app/lib/db';
export async function POST(req) {
	const verificationObj = await req.json();
	const { name, token } = verificationObj;
	try {
		await DBConnection();
		const result = jwt.verify(token, process.env.SECRET_KEY);
		const updatedUser = await User.findOneAndUpdate(
			{ name },
			{
				verified: true,
			}
		);
		return NextResponse.json('Success 🎉');
	} catch (error) {
		console.log(error.message);
		return NextResponse.json('Error ');
	}
}
