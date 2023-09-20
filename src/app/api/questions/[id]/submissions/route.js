import DBConnection from '@/app/lib/db';
import Submission from '@/app/models/submission';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
	const { id } = params;
	const userId = '64fc795f1e862a8ac3956204';
	try {
		await DBConnection();
		const result = await Submission.find({ userId, questionId: id });
		return NextResponse.json({
			result,
		});
	} catch (error) {
		return NextResponse.json(error.message);
	}
}
