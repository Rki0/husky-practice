#!/usr/bin/env node

import { askPackageManager } from "./prompt.js";
import { initialize } from "./initialize.js";
import { installDependencies } from "./dependencies.js";
import { intializeHusky } from "./initializeHusky.js";
import { blockDirectCommitCommand } from "./gitAction.js";
import { updatePackageJson } from "./updatePackageJson.js";
import { setCzConfig } from "./setCzConfig.js";
import { getPackageJson } from "./handlePackageJson.js";

const packageManager = await askPackageManager();

const { packageJsonPath, isTherePackageJson } = getPackageJson();

if (!isTherePackageJson) {
  initialize(packageManager);
}

installDependencies(packageManager);
intializeHusky(packageManager);
blockDirectCommitCommand();
updatePackageJson(packageJsonPath);
setCzConfig();
