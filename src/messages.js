const getMessage = {
  compAdded: () => 'An exported component was added to the file',
  compDeleted: () => 'An exported component was deleted from the file',
  propsChanged: compName => `PropTypes were changed in ${compName} component`,
  fileChanged: (filePath, fileMessage) =>
    `Changes detected in ${filePath} - ${fileMessage}. Please update relevant index.d.ts file and push again.`,
};

module.exports = getMessage;
