import path from "path";
import { FS } from "./utils/fileSystem.js";

export const blockDirectCommitCommand = () => {
  const huskyPreCommitPath = path.resolve(process.cwd(), ".husky/pre-commit");

  const gitCommitBlockCode = `if [ "$CZ_TEST" != "true" ]; then
  echo "Don't use git commit. Please use npm run commit."
  exit 1
fi
`;

  FS.writeFileSync(huskyPreCommitPath, gitCommitBlockCode);
  console.log(".husky/pre-commit is initialized.");
};
