import fs from "fs";

export const FS = {
  existsSync(path) {
    return fs.existsSync(path);
  },
  readFileSync(path) {
    return fs.readFileSync(path, "utf8");
  },
  writeFileSync(path, data) {
    fs.writeFileSync(path, data, "utf8");
  },
};
