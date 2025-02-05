import { PACKAGE_MANAGER } from "./prompt.js";

export const intializeHusky = (target) => {
  switch (target) {
    case PACKAGE_MANAGER.npm:
      execSync("npx husky init");
      break;
    case PACKAGE_MANAGER.yarn:
      console.log("You choose yarn");
      break;
    case PACKAGE_MANAGER.pnpm:
      console.log("You choose pnpm");
      break;
    default:
      break;
  }

  console.log("Initialize husky.");
};
