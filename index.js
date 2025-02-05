#!/usr/bin/env node

import fs from "fs";
import path from "path";

import { askPackageManager } from "./prompt.js";
import { initialize } from "./initialize.js";
import { installDependencies } from "./dependencies.js";
import { intializeHusky } from "./initializeHusky.js";
import { blockDirectCommitCommand } from "./gitAction.js";
import { updatePackageJson } from "./updatePackageJson.js";
import { setCzConfig } from "./setCzConfig.js";

const packageManager = await askPackageManager();

const packageJsonPath = path.resolve(process.cwd(), "package.json");
const isTherePackageJson = fs.existsSync(packageJsonPath);

if (!isTherePackageJson) {
  initialize(packageManager);
}

installDependencies();
intializeHusky();
blockDirectCommitCommand();
updatePackageJson(packageJsonPath);
setCzConfig();
