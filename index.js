#!/usr/bin/env node

import fs from "fs";
import path from "path";

import { askPackageManager } from "./prompt.js";
import { initialize } from "./initialize.js";
import { installDependencies } from "./dependencies.js";
import { intializeHusky } from "./initializeHusky.js";
import { blockDirectCommitCommand } from "./gitAction.js";

const packageManager = await askPackageManager();

const packageJsonPath = path.resolve(process.cwd(), "package.json");
const isTherePackageJson = fs.existsSync(packageJsonPath);

if (!isTherePackageJson) {
  initialize(packageManager);
}

installDependencies();
intializeHusky();
blockDirectCommitCommand();

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
