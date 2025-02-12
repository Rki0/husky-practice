import path from "path";

export const Path = {
  resolve(filePath) {
    path.resolve(process.cwd(), filePath);
  },
};
