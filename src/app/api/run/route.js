import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import { v4 } from 'uuid';
import executeCpp from '@/app/services/executeCpp';

export async function POST(request) {
	try {
		//you have to create folder programs if not there
		const data = await request.formData();
		const language = data.get('language');
		const program = data.get('program');
		const input = data.get('input');
		const dirPrograms = path.join(process.cwd(), '/src/app/programs');
		if (!fs.existsSync(dirPrograms)) {
			fs.mkdirSync(dirPrograms, { recursive: true });
		}
		//add file with uniqueId
		const id = v4();
		const filename = `${id}.${language}`;
		const filePath = path.join(dirPrograms, filename);
		fs.writeFileSync(filePath, program);
		//execute that file using child_process module
		const result = await executeCpp(filePath, input);
		return NextResponse.json({ result });
	} catch (error) {
		console.log(error);
		return NextResponse.json({ error: error.message });
	}
}
