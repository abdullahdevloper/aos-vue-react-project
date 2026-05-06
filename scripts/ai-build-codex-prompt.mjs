import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

function read(p) {
  return fs.existsSync(path.join(root, p)) ? fs.readFileSync(path.join(root, p), "utf8") : "";
}

const codexRules = read("ai/prompts/codex/execute-task.md");
const task = read("ai/tasks/current-task.md");
const snapshot = read("ai/context/project-snapshot.md");

const prompt = `${codexRules}

# Approved Task Pack

${task}

# Project Snapshot

${snapshot}

# Execution Requirement

Implement the task now. Keep the change set minimal.
After implementation, run the available validation commands from package.json.
`;

fs.writeFileSync(path.join(root, "ai", "tasks", "codex-execution-prompt.md"), prompt);
console.log("[OK] wrote ai/tasks/codex-execution-prompt.md");
console.log("Use this with Codex CLI/Cloud.");
