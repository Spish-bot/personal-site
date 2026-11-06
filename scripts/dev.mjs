import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const input = process.argv.slice(2);
const args = ["dev"];

for (let index = 0; index < input.length; index += 1) {
  const argument = input[index];
  if (argument === "--host") {
    const value = input[index + 1] && !input[index + 1].startsWith("-") ? input[++index] : "0.0.0.0";
    args.push("--hostname", value);
  } else if (argument.startsWith("--host=")) {
    args.push("--hostname", argument.slice("--host=".length) || "0.0.0.0");
  } else {
    args.push(argument);
  }
}

const nextBinary = fileURLToPath(new URL("../node_modules/next/dist/bin/next", import.meta.url));
const child = spawn(process.execPath, [nextBinary, ...args], { stdio: "inherit", env: process.env });

for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => child.kill(signal));
}

child.on("error", (error) => {
  console.error(error);
  process.exitCode = 1;
});
child.on("exit", (code, signal) => {
  process.exitCode = code ?? (signal ? 1 : 0);
});
