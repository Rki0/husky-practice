import { FS } from "./utils/fileSystem.js";
import { Path } from "./utils/pathSystem.js";

export const CZ = {
  updatePackageJson(path) {
    const packageJson = JSON.parse(FS.readFileSync(path));

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
        config: "cz-config.cjs",
      },
    };

    FS.writeFileSync(path, JSON.stringify(packageJson, null, 2));

    console.log("package.json updated.");
  },

  setCommitConvention() {
    const czConfigPath = Path.resolve("cz-config.cjs");

    const czConfigContent = `module.exports = {
      types: [
        { value: "✨ Feat", name: "✨ Feat:\\tAdd a new feature" },
        { value: "🐛 Modify", name: "🐛 Fix:\\tModify production, UI,UX code" },
        { value: "📝 Docs", name: "📝 Docs:\\tAdd or update documentation" },
        {
          value: "💄 Style",
          name: "💄 Style:\\tAdd or update code format (not updation production, UI,UX code)",
        },
        {
          value: "🤖 Refactor",
          name: "🤖 Refactor:\\tCode change that neither fixes a bug nor adds a feature",
        },
        {
          value: "✅ Test",
          name: "✅ Test:\\tCode change related with tests cases",
        },
        {
          value: "🚚 Chore",
          name: "🚚 Chore:\\tChanges to the build process or auxiliary tools\\n\\t\\tand libraries such as documentation generation",
        },
      ],
      messages: {
        type: "Select the type of change that you're committing:",
        subject: "Write a title:\\n",
        body: 'Write a description (optional). Use "|" to break new line:\\n',
        confirmCommit: "Are you sure you want to proceed with the commit above?",
      },
      allowCustomScopes: false,
      skipQuestions: ["scope", "breaking", "footer"],
      allowTicketNumber: true,
      isTicketNumberRequired: false,
      ticketNumberPrefix: "ECBS-",
      subjectLimit: 100,
    };`;

    FS.writeFileSync(czConfigPath, czConfigContent);
    console.log("cz-config.js updated.");
  },
};
