import path from "path";

export const Path = {
  resolve(filePath) {
    return path.resolve(process.cwd(), filePath);
  },
};
