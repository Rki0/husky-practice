#!/usr/bin/env node

import { askPackageManager } from "./prompt.js";
import { PackageJson } from "./packageJson.js";
import { Husky } from "./husky.js";
import { CZ } from "./cz.js";

const packageManager = await askPackageManager();

const { packageJsonPath, isTherePackageJson } = PackageJson.get();

if (!isTherePackageJson) {
  PackageJson.initialize(packageManager);
}

PackageJson.installDependencies(packageManager);

Husky.intializeHusky(packageManager);
Husky.blockDirectCommitCommand();

CZ.updatePackageJson(packageJsonPath);
CZ.setCommitConvention();
