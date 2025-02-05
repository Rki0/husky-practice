import { select } from "@inquirer/prompts";

export const PACKAGE_MANAGER = Object.freeze({
  npm: "npm",
  yarn: "yarn",
  pnpm: "pnpm",
});

export const askPackageManager = async () => {
  const packageManager = await select({
    message: "Choose your package manager.",
    choices: [
      {
        name: PACKAGE_MANAGER.npm,
        value: PACKAGE_MANAGER.npm,
      },
      {
        name: PACKAGE_MANAGER.yarn,
        value: PACKAGE_MANAGER.yarn,
      },
      {
        name: PACKAGE_MANAGER.pnpm,
        value: PACKAGE_MANAGER.pnpm,
      },
    ],
  });

  return packageManager;
};
