import fs from "fs";

export const updatePackageJson = (path) => {
  const packageJson = JSON.parse(fs.readFileSync(path, "utf8"));

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
