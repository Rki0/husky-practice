import fs from "fs";

export const FS = {
  existsSync(path) {
    return fs.existsSync(path);
  },
  readFileSync(path) {
    return fs.readFileSync(path, "utf8");
  },
};
