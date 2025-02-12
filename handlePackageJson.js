import path from "path";
import { FS } from "./utils/fileSystem.js";

export const getPackageJson = () => {
  const packageJsonPath = path.resolve(process.cwd(), "package.json");
  const isTherePackageJson = FS.existsSync(packageJsonPath);

  return { packageJsonPath, isTherePackageJson };
};
