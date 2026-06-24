import { existsSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const expectedFiles = [
  ".agents/plugins/marketplace.json",
  ".claude-plugin/marketplace.json",
  ".claude-plugin/plugin.json",
  ".codex-plugin/plugin.json",
  ".cursor-plugin/marketplace.json",
  ".cursor-plugin/plugin.json",
  ".gitignore",
  ".mcp.json",
  "LICENSE",
  "README.md",
  "assets/logo.svg",
  "package.json",
  "scripts/validate-surface.mjs",
  "skills/pr-visual/SKILL.md",
];

const actualFiles = listFiles(".")
  .filter((path) => !path.startsWith(".git/"))
  .sort();

const expected = [...expectedFiles].sort();

if (actualFiles.length !== expected.length) {
  throw new Error(`Expected ${expected.length} files, found ${actualFiles.length}:\n${actualFiles.join("\n")}`);
}

for (const file of expected) {
  if (!actualFiles.includes(file)) {
    throw new Error(`Missing expected file: ${file}`);
  }
}

for (const file of actualFiles) {
  if (!expected.includes(file)) {
    throw new Error(`Unexpected file in package surface: ${file}`);
  }
}

console.log("Plugin package surface is valid.");

function listFiles(dir) {
  return readdirSync(dir).flatMap((entry) => {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) {
      return listFiles(path);
    }
    return path.replace(/^\.\//, "");
  });
}
