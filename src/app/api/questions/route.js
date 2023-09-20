import DBConnection from '@/app/lib/db';
import Question from '@/app/models/question';
import { NextResponse } from 'next/server';

export async function GET(request) {
	try {
		await DBConnection();
		const questions = await Question.find({});
		return NextResponse.json({
			questions,
		});
	} catch (error) {
		return NextResponse.json(error.message);
	}
}
export async function POST(request) {
	try {
		await DBConnection();
		const questionObj = await request.json();
		const newQuestion = await Question.create(questionObj);
		return NextResponse.json('Question created Successfully 🎉');
	} catch (error) {
		return NextResponse.json(error.message);
	}
}
