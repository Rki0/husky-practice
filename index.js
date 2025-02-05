#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { select } from "@inquirer/prompts";
import { exit } from "process";

const PACKAGE_MANAGER = Object.freeze({
  npm: "npm",
  yarn: "yarn",
  pnpm: "pnpm",
});

const packageManager = await select({
  message: "Choose your package manager.",
  choices: [
    {
      name: PACKAGE_MANAGER.npm,
      value: PACKAGE_MANAGER.npm,
    },
    {
      name: PACKAGE_MANAGER.yarn,
      value: PACKAGE_MANAGER.yarn,
    },
    {
      name: PACKAGE_MANAGER.pnpm,
      value: PACKAGE_MANAGER.pnpm,
    },
  ],
});

const packageJsonPath = path.resolve(process.cwd(), "package.json");
const isTherePackageJson = fs.existsSync(packageJsonPath);

switch (packageManager) {
  case PACKAGE_MANAGER.npm:
    if (!isTherePackageJson) {
      execSync("npm init -y");
      console.log("Initialize package manager.");
    }

    execSync("npm i -D commitizen cz-customizable husky inquirer");
    console.log("Dependencies are installed.");

    execSync("npx husky init");
    console.log("Initialize husky.");

    break;
  case PACKAGE_MANAGER.yarn:
    console.log("You choose yarn");
    exit(1);
    break;
  case PACKAGE_MANAGER.pnpm:
    console.log("You choose pnpm");
    exit(1);
    break;
  default:
    break;
}

const huskyPreCommitPath = path.resolve(process.cwd(), ".husky/pre-commit");
const gitCommitBlockCode = `if [ "$CZ_TEST" != "true" ]; then
  echo "Don't use git commit. Please use npm run commit."
  exit 1
fi
`;

fs.writeFileSync(huskyPreCommitPath, gitCommitBlockCode, "utf8");
console.log(".husky/pre-commit is initialized.");

const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));

packageJson.scripts = {
  ...packageJson.scripts,
  commit: "CZ_TEST=true cz",
};

packageJson.config = {
  ...packageJson.config,
  commitizen: {
    path: "cz-customizable",
  },
  "cz-customizable": {
    config: "cz-config.js",
  },
};

fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2), "utf8");
console.log("package.json updated.");

const czConfigPath = path.resolve(process.cwd(), "cz-config.js");

const czConfigContent = `module.exports = {
  types: [
    { value: "✨ Feat", name: "✨ Feat:\\tAdd a new feature" },
    { value: "🐛 Modify", name: "🐛 Fix:\\tModify production, UI,UX code" },
    { value: "📝 Docs", name: "📝 Docs:\\tAdd or update documentation" },
    {
      value: "💄 Style",
      name: "💄 Style:\\tAdd or update code format (not updation production, UI,UX code)",
    },
    {
      value: "🤖 Refactor",
      name: "🤖 Refactor:\\tCode change that neither fixes a bug nor adds a feature",
    },
    {
      value: "✅ Test",
      name: "✅ Test:\\tCode change related with tests cases",
    },
    {
      value: "🚚 Chore",
      name: "🚚 Chore:\\tChanges to the build process or auxiliary tools\\n\\t\\tand libraries such as documentation generation",
    },
  ],
  messages: {
    type: "Select the type of change that you're committing:",
    subject: "Write a title:\\n",
    body: 'Write a description (optional). Use "|" to break new line:\\n',
    confirmCommit: "Are you sure you want to proceed with the commit above?",
  },
  allowCustomScopes: false,
  skipQuestions: ["scope", "breaking", "footer"],
  allowTicketNumber: true,
  isTicketNumberRequired: false,
  ticketNumberPrefix: "ECBS-",
  subjectLimit: 100,
};`;

fs.writeFileSync(czConfigPath, czConfigContent, "utf8");
console.log("cz-config.js updated.");
