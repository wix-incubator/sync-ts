const messages = {
  compAdded: () => '\t\tAn exported component was added to the file.\n',
  compDeleted: () => '\t\tAn exported component was deleted from the file.\n',
  verificationFailed: () =>
    '** SyncTS Failed, please fix files listed above and re-run build. **',
  propsChanged: compName =>
    `\t\tPropTypes were changed in ${compName} component.\n`,
  fileChanged: (filePath, fileMessage) =>
    `SyncTS Error: Changes detected in ${filePath} - please update relevant index.d.ts file and push again.\nIssues to fix:\n${fileMessage}`,
  branchChangeFailed: branch => `cannot switch to ${branch}`,
};

module.exports = messages;
