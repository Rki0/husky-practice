import fs from "fs";
import path from "path";

export const blockDirectCommitCommand = () => {
  const huskyPreCommitPath = path.resolve(process.cwd(), ".husky/pre-commit");
  const gitCommitBlockCode = `if [ "$CZ_TEST" != "true" ]; then
  echo "Don't use git commit. Please use npm run commit."
  exit 1
fi
`;

  fs.writeFileSync(huskyPreCommitPath, gitCommitBlockCode, "utf8");
  console.log(".husky/pre-commit is initialized.");
};
