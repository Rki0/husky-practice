import fs from "fs";
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

  fs.writeFileSync(path, JSON.stringify(packageJson, null, 2), "utf8");

  console.log("package.json updated.");
};
