module.exports = {
      types: [
        { value: "✨ Feat", name: "✨ Feat:\tAdd a new feature" },
        { value: "🐛 Modify", name: "🐛 Fix:\tModify production, UI,UX code" },
        { value: "📝 Docs", name: "📝 Docs:\tAdd or update documentation" },
        {
          value: "💄 Style",
          name: "💄 Style:\tAdd or update code format (not updation production, UI,UX code)",
        },
        {
          value: "🤖 Refactor",
          name: "🤖 Refactor:\tCode change that neither fixes a bug nor adds a feature",
        },
        {
          value: "✅ Test",
          name: "✅ Test:\tCode change related with tests cases",
        },
        {
          value: "🚚 Chore",
          name: "🚚 Chore:\tChanges to the build process or auxiliary tools\n\t\tand libraries such as documentation generation",
        },
      ],
      messages: {
        type: "Select the type of change that you're committing:",
        subject: "Write a title:\n",
        body: 'Write a description (optional). Use "|" to break new line:\n',
        confirmCommit: "Are you sure you want to proceed with the commit above?",
      },
      allowCustomScopes: false,
      skipQuestions: ["scope", "breaking", "footer"],
      allowTicketNumber: true,
      isTicketNumberRequired: false,
      ticketNumberPrefix: "ECBS-",
      subjectLimit: 100,
    };