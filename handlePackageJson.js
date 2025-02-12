import { FS } from "./utils/fileSystem.js";
import { Path } from "./utils/pathSystem.js";

export const getPackageJson = () => {
  const packageJsonPath = Path.resolve(process.cwd(), "package.json");
  const isTherePackageJson = FS.existsSync(packageJsonPath);

  return { packageJsonPath, isTherePackageJson };
};
