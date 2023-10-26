import path from "path";
import fs from "fs";
import { exec } from "child_process";
const runWithTimeout = (command, input, timeout) => {
  return new Promise((resolve, reject) => {
    const child = exec(command);
    let timedOut = false;

    // Set a timeout to kill the child process if it exceeds the time limit
    const timeoutId = setTimeout(() => {
      timedOut = true;
      child.kill(); // Kill the child process
      reject(new Error("Time Limit Exceeded"));
    }, timeout);

    child.stdin.end(input);

    // Handle the child process events
    child.stdout.on("data", (data) => {
      if (!timedOut) {
        clearTimeout(timeoutId); // Cancel the timeout
        resolve(data);
      }
    });

    child.stderr.on("data", (error) => {
      if (!timedOut) {
        clearTimeout(timeoutId); // Cancel the timeout
        reject(error);
      }
    });

    child.on("exit", (code) => {
      if (!timedOut) {
        clearTimeout(timeoutId); // Cancel the timeout
        resolve(code);
      }
    });
  });
};
const executeCpp = async (filepath, inputs, timeLimit = 1) => {
  const outputPath = path.join(process.cwd(), "/src/app/outputs");
  //create output folder is doesn't exist
  if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
  }
  //extract the filename
  const jobId = path.basename(filepath).split(".")[0];
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
        const command = `cd ${outputPath} && ./${jobId}.out`;
        const timeout = timeLimit * 1000; // Convert seconds to milliseconds
        return runWithTimeout(command, input, timeout);
      }),
    );
    return outputs;
  } catch (error) {
    throw new Error(error.message);
  }
};
export default executeCpp;
