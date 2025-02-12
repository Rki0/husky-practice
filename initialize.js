import { execSync } from "node:child_process";
import { PACKAGE_MANAGER } from "./prompt.js";

export const initialize = (target) => {
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
};
