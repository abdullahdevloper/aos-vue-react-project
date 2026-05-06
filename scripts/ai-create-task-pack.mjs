import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

function read(p) {
  return fs.existsSync(path.join(root, p)) ? fs.readFileSync(path.join(root, p), "utf8") : "";
}

const requirement = read("ai/tasks/current-task.md");
const projectSnapshot = read("ai/context/project-snapshot.md");
const promptTemplate = read("ai/prompts/gemini/create-task-pack.md");

const prompt = `# Gemini Task Pack Creation Prompt

${promptTemplate}

# Current Draft Task

${requirement}

# Project Snapshot

${projectSnapshot}

# Output Instruction

Rewrite ai/tasks/current-task.md into a final, strict Task Pack.
If required details are missing, mark Task Status as BLOCKED.
`;

fs.writeFileSync(path.join(root, "ai", "tasks", "gemini-task-pack-prompt.md"), prompt);
console.log("[OK] wrote ai/tasks/gemini-task-pack-prompt.md");
console.log("Send this file to Gemini Pro, then paste the approved result back into ai/tasks/current-task.md");
