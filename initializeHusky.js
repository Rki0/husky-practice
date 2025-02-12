import { execSync } from "node:child_process";
import { PACKAGE_MANAGER } from "./prompt.js";
import { getPackageJson } from "./handlePackageJson.js";

const initializeHuskyForYarn = () => {
  const { packageJsonPath } = getPackageJson();

  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));

  packageJson.scripts = {
    ...packageJson.scripts,
    postinstall: "husky",
    prepack: "pinst --disable",
    postpack: "pinst --enable",
  };
};

export const intializeHusky = (target) => {
  switch (target) {
    case PACKAGE_MANAGER.npm:
      execSync("npx husky init");
      break;
    case PACKAGE_MANAGER.yarn:
      initializeHuskyForYarn();
      execSync("yarn run postinstall");
      break;
    case PACKAGE_MANAGER.pnpm:
      console.log("You choose pnpm");
      break;
    default:
      break;
  }

  console.log("Initialize husky.");
};
