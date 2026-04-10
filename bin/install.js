#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const os = require("os");

const SKILL_NAME = "skill-caveman";

const BOLD = "\x1b[1m";
const GREEN = "\x1b[32m";
const RED = "\x1b[31m";
const YELLOW = "\x1b[33m";
const CYAN = "\x1b[36m";
const RESET = "\x1b[0m";

function log(msg) {
  console.log(msg);
}

function success(msg) {
  log(`${GREEN}✔${RESET} ${msg}`);
}

function warn(msg) {
  log(`${YELLOW}⚠${RESET} ${msg}`);
}

function error(msg) {
  log(`${RED}✖${RESET} ${msg}`);
}

function getInstallDir() {
  const codexHome = process.env.CODEX_HOME;
  if (codexHome) {
    return path.join(codexHome, "skills", SKILL_NAME);
  }

  const candidates = [
    path.join(os.homedir(), ".codex", "skills"),
    path.join(os.homedir(), ".claude", "skills"),
  ];

  for (const dir of candidates) {
    if (fs.existsSync(dir)) {
      return path.join(dir, SKILL_NAME);
    }
  }

  return path.join(os.homedir(), ".claude", "skills", SKILL_NAME);
}

function showHelp() {
  log("");
  log(`${BOLD}${CYAN}🦴 skill-caveman installer${RESET}`);
  log("");
  log("Usage:");
  log(`  npx skill-caveman            Install the skill`);
  log(`  npx skill-caveman --uninstall Remove the skill`);
  log(`  npx skill-caveman --help      Show this help`);
  log("");
  log("Options:");
  log(`  --path <dir>   Custom install directory`);
  log(`  --uninstall    Remove an existing installation`);
  log(`  --help, -h     Show help`);
  log("");
}

function copyRecursive(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function install(targetDir) {
  log("");
  log(`${BOLD}${CYAN}🦴 skill-caveman${RESET}`);
  log(`${CYAN}Ooga! Me install caveman skill into your cave...${RESET}`);
  log("");

  const pkgRoot = path.resolve(__dirname, "..");
  const skillFile = path.join(pkgRoot, "SKILL.md");

  if (!fs.existsSync(skillFile)) {
    error("SKILL.md not found in package. Something wrong with installation.");
    process.exit(1);
  }

  if (fs.existsSync(targetDir)) {
    warn(`Directory already exists: ${targetDir}`);
    warn("Overwriting existing installation...");
    fs.rmSync(targetDir, { recursive: true, force: true });
  }

  fs.mkdirSync(targetDir, { recursive: true });
  fs.copyFileSync(skillFile, path.join(targetDir, "SKILL.md"));

  success(`Skill installed to: ${BOLD}${targetDir}${RESET}`);
  log("");
  log(`${BOLD}Next steps:${RESET}`);
  log(`  1. Restart Claude Code to pick up the new skill`);
  log(`  2. Start chatting — Claude will now speak like caveman!`);
  log(`  3. To disable, ask Claude to "stop caveman mode"`);
  log("");
  log(`${CYAN}Claude hungry. Claude go code now. 🦴${RESET}`);
  log("");
}

function uninstall(targetDir) {
  log("");
  log(`${BOLD}${CYAN}🦴 skill-caveman uninstaller${RESET}`);
  log("");

  if (!fs.existsSync(targetDir)) {
    warn("Skill not found. Nothing to remove.");
    return;
  }

  fs.rmSync(targetDir, { recursive: true, force: true });
  success(`Skill removed from: ${BOLD}${targetDir}${RESET}`);
  log("Restart Claude Code to apply changes.");
  log("");
}

function main() {
  const args = process.argv.slice(2);

  if (args.includes("--help") || args.includes("-h")) {
    showHelp();
    return;
  }

  let customPath = null;
  const pathIdx = args.indexOf("--path");
  if (pathIdx !== -1 && args[pathIdx + 1]) {
    customPath = path.resolve(args[pathIdx + 1], SKILL_NAME);
  }

  const targetDir = customPath || getInstallDir();

  if (args.includes("--uninstall")) {
    uninstall(targetDir);
  } else {
    install(targetDir);
  }
}

main();
