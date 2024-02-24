import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import Docker from "dockerode";
import { spawnSync } from "child_process";

export async function POST(request) {
  let container, filePath;
  try {
    //you have to create folder programs if not there
    const data = await request.json();
    const { language, program, inputs, timeLimit } = data;

    const dirPrograms = path.join(process.cwd(), "/src/app/programs");
    if (!fs.existsSync(dirPrograms)) {
      fs.mkdirSync(dirPrograms, { recursive: true });
    }
    //add file with uniqueId
    const docker = new Docker();
    container = await docker.createContainer({
      Image: "online-img",
      AttachStdin: false,
      AttachStdout: true,
      AttachStderr: true,
      Tty: true,
    });
    await container.start();

    const filename = `code.${language}`;
    filePath = path.join(dirPrograms, filename);
    fs.writeFileSync(filePath, program);
    const codePath = `${container.id}:online-judge/code.${language}`;
    const outPath = `code.out`;
    spawnSync(`docker cp ${filePath}  ${codePath}`, {
      encoding: "utf-8",
      shell: true,
    });
    const compileCommand = `g++ code.${language} -o ${outPath}`;
    spawnSync("docker", [
      "exec",
      "-i",
      container.id,
      "/bin/sh",
      "-c",
      compileCommand,
    ]);

    const outputs = inputs.map((input, index) => {
      const command = `./code.out`;
      const timeout = timeLimit * 1000;
      const result = spawnSync(
        "docker",
        ["exec", "-i", container.id, "sh", "-c", command],
        {
          input: input,
          encoding: "utf-8",
          timeout,
        },
      );
      if (result.error && result.error.code === "ETIMEDOUT") {
        throw Error(`Time Limit Exceeded on TestCase ${index + 1}`);
      }
      if (result.status !== 0 || result.error) {
        throw Error("Runtime Error");
      }
      return result;
    });

    fs.unlinkSync(filePath);
    await container.kill();
    await container.remove();
    return NextResponse.json({ result: outputs.map(({ stdout }) => stdout) });
  } catch (error) {
    fs.unlinkSync(filePath);
    if (!!container) {
      await container.kill();
      await container.remove();
    }
    const response = new NextResponse(error.message, { status: 500 });
    return response;
  }
}
