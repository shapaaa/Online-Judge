import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import { v4 } from 'uuid';
import { exec } from 'child_process';

const executeCpp = (filepath) => {
	const outputPath = path.join(process.cwd(), '/src/app/outputs');
	//create output folder is doesn't exist
	if (!fs.existsSync(outputPath)) {
		fs.mkdirSync(outputPath, { recursive: true });
	}
	//extract the filename
	const jobId = path.basename(filepath).split('.')[0];
	const outPath = path.join(outputPath, `${jobId}.out`);
	return new Promise((resolve, reject) => {
		exec(
			`g++ ${filepath} -o ${outPath} && cd ${outputPath} && .\/${jobId}.out`,
			(error, stdout, stderr) => {
				if (error) {
					reject({ error, stderr });
				}
				if (stderr) {
					reject(stderr);
				}
				resolve(stdout);
			}
		);
	});
};

export async function POST(request) {
	try {
		//you have to create folder programs if not there
		const data = await request.formData();
		const language = data.get('language');
		const program = data.get('program');
		const dirPrograms = path.join(process.cwd(), '/src/app/programs');
		// console.log(dirPrograms);
		if (!fs.existsSync(dirPrograms)) {
			const result = fs.mkdirSync(dirPrograms, { recursive: true });
		}
		//add file with uniqueId
		const id = v4();
		const filename = `${id}.${language}`;
		const filePath = path.join(dirPrograms, filename);
		await fs.writeFileSync(filePath, program);
		//execute that file using child_process module
		const result = await executeCpp(filePath);
		return NextResponse.json({ result });
	} catch (error) {
		console.log(error);
		return NextResponse.json({ error: error.message });
	}
}
