#!/usr/bin/env node

import { askPackageManager } from "./prompt.js";
import { initialize } from "./initialize.js";
import { installDependencies } from "./dependencies.js";
import { Husky } from "./husky.js";
import { getPackageJson } from "./handlePackageJson.js";
import { CZ } from "./cz.js";

const packageManager = await askPackageManager();

const { packageJsonPath, isTherePackageJson } = getPackageJson();

if (!isTherePackageJson) {
  initialize(packageManager);
}

installDependencies(packageManager);

Husky.intializeHusky(packageManager);
Husky.blockDirectCommitCommand();

CZ.updatePackageJson(packageJsonPath);
CZ.setCommitConvention();
