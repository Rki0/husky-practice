import { PACKAGE_MANAGER } from "./prompt.js";

const libraries = [
  "commitizen",
  "cz-customizable",
  "husky",
  "@inquirer/prompts",
];

export const installDependencies = (target) => {
  const librariesCmd = libraries.join(" ");

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
};
