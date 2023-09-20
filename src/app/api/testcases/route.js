import DBConnection from '@/app/lib/db';
import TestCase from '@/app/models/testcase';
import { NextResponse } from 'next/server';

export async function POST(request) {
	try {
		await DBConnection();
		const testCase = await request.json();
		const result = await TestCase.create(testCase);
		return NextResponse.json('TestCase added Successfully 🎉');
	} catch (error) {
		return NextResponse.json(error.message);
	}
}
