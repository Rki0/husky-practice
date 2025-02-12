import { FS } from "./utils/fileSystem.js";

export const updatePackageJson = (path) => {
  const packageJson = JSON.parse(FS.readFileSync(path));

  packageJson.scripts = {
    ...packageJson.scripts,
    commit: "CZ_TEST=true cz",
  };

  packageJson.config = {
    ...packageJson.config,
    commitizen: {
      path: "cz-customizable",
    },
    "cz-customizable": {
      config: "cz-config.js",
    },
  };

  FS.writeFileSync(path, JSON.stringify(packageJson, null, 2));

  console.log("package.json updated.");
};
