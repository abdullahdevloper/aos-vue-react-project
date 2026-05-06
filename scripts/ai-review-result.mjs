import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

const root = process.cwd();

function read(p) {
  return fs.existsSync(path.join(root, p)) ? fs.readFileSync(path.join(root, p), "utf8") : "";
}

let diff = "";
try {
  diff = execSync("git diff -- .", { encoding: "utf8", maxBuffer: 20 * 1024 * 1024 });
} catch (e) {
  diff = String(e.stdout || e.message || "");
}

const promptTemplate = read("ai/prompts/gemini/review-result.md");
const task = read("ai/tasks/current-task.md");
const snapshot = read("ai/context/project-snapshot.md");

const prompt = `# Gemini Review Prompt

${promptTemplate}

# Task Pack

${task}

# Project Snapshot

${snapshot}

# Git Diff

\`\`\`diff
${diff}
\`\`\`

# Output Instruction

Review the implementation and provide PASS / PASS_WITH_NOTES / FAIL.
`;

fs.writeFileSync(path.join(root, "ai", "reviews", "gemini-review-prompt.md"), prompt);
console.log("[OK] wrote ai/reviews/gemini-review-prompt.md");
console.log("Send this file to Gemini Pro for final review.");
