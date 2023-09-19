import path from 'path';
import fs from 'fs';
import { exec } from 'child_process';
const executeCpp = async (filepath, inputs) => {
	const outputPath = path.join(process.cwd(), '/src/app/outputs');
	//create output folder is doesn't exist
	if (!fs.existsSync(outputPath)) {
		fs.mkdirSync(outputPath, { recursive: true });
	}
	//extract the filename
	const jobId = path.basename(filepath).split('.')[0];
	const outPath = path.join(outputPath, `${jobId}.out`);
	await new Promise((resolve, reject) => {
		exec(`g++ ${filepath} -o ${outPath} `, (error, stdout, stderr) => {
			if (error) {
				reject({ error, stderr });
			}
			if (stderr) {
				reject(stderr);
			}
			resolve(stdout);
		});
	});
	try {
		const outputs = await Promise.all(
			inputs.map(async (input) => {
				const child = exec(`cd ${outputPath} && .\/${jobId}.out`);
				child.stdin.end(input);
				return new Promise((resolve, reject) => {
					child.stdout.on('data', (data) => {
						resolve(data);
					});
					child.stderr.on('data', (x) => {
						reject(error);
					});
					child.on('exit', (code) => {
						resolve(code);
					});
				});
			})
		);
		return outputs;
	} catch (error) {
		throw new Error(error.message);
	}
};
export default executeCpp;
