import fs from "fs";
import path from "path";

export const getPackageJson = () => {
  const packageJsonPath = path.resolve(process.cwd(), "package.json");
  const isTherePackageJson = fs.existsSync(packageJsonPath);

  return { packageJsonPath, isTherePackageJson };
};
