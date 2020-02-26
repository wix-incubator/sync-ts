const messages = {
  compAdded: () => 'An exported component was added to the file.',
  compDeleted: () => 'An exported component was deleted from the file.',
  verificationFailed: () =>
    '** SyncTS Failed for PR, please fix files listed above and re-run build. **',
  propsChanged: compName => `\tPropTypes were changed in ${compName} component\n`,
  fileChanged: (filePath, fileMessage) =>
    `Error: Changes detected in ${filePath} - please update relevant index.d.ts file and push again.\nIssues to fix:\n${fileMessage}\n`,
};

module.exports = messages;
