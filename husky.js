import { execSync } from "node:child_process";
import { FS } from "./utils/fileSystem.js";
import { Path } from "./utils/pathSystem.js";
import { PACKAGE_MANAGER } from "./prompt.js";
import { PackageJson } from "./packageJson.js";

export const Husky = {
  initializeHuskyForYarn() {
    const { packageJsonPath } = PackageJson.get();

    const packageJson = JSON.parse(FS.readFileSync(packageJsonPath));

    packageJson.scripts = {
      ...packageJson.scripts,
      postinstall: "husky",
      prepack: "pinst --disable",
      postpack: "pinst --enable",
    };

    FS.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  },

  intializeHusky(target) {
    switch (target) {
      case PACKAGE_MANAGER.npm:
        execSync("npx husky init");
        break;
      case PACKAGE_MANAGER.yarn:
        this.initializeHuskyForYarn();
        execSync("yarn run postinstall");
        break;
      case PACKAGE_MANAGER.pnpm:
        execSync("pnpm exec husky init");
        break;
      default:
        break;
    }

    console.log("Initialize husky.");
  },

  blockDirectCommitCommand() {
    const huskyPreCommitPath = Path.resolve(".husky/pre-commit");

    const gitCommitBlockCode = `if [ "$CZ_TEST" != "true" ]; then
    echo "Don't use git commit. Please use npm run commit."
    exit 1
  fi
  `;

    FS.writeFileSync(huskyPreCommitPath, gitCommitBlockCode);

    console.log(".husky/pre-commit is initialized.");
  },
};
