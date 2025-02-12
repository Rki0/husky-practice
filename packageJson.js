import { FS } from "./utils/fileSystem.js";
import { Path } from "./utils/pathSystem.js";

export const PackageJson = {
  libraries: ["commitizen", "cz-customizable", "husky", "@inquirer/prompts"],

  get() {
    const packageJsonPath = Path.resolve("package.json");
    const isTherePackageJson = FS.existsSync(packageJsonPath);

    return { packageJsonPath, isTherePackageJson };
  },

  initialize(target) {
    switch (target) {
      case PACKAGE_MANAGER.npm:
        execSync("npm init -y");
        break;
      case PACKAGE_MANAGER.yarn:
        execSync("yarn init");
        break;
      case PACKAGE_MANAGER.pnpm:
        console.log("You choose pnpm");
        break;
      default:
        break;
    }

    console.log("Initialize package manager.");
  },

  installDependencies(target) {
    const librariesCmd = this.libraries.join(" ");

    switch (target) {
      case PACKAGE_MANAGER.npm:
        execSync(`npm i -D ${librariesCmd}`);
        break;
      case PACKAGE_MANAGER.yarn:
        execSync(`yarn add -D ${librariesCmd}`);
        break;
      case PACKAGE_MANAGER.pnpm:
        console.log("You choose pnpm");
        break;
      default:
        break;
    }

    console.log("Dependencies are installed.");
  },
};
