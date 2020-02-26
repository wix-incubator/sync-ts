const didPropsChange = require(`./props-change-checker`);
const messages = require('./messages');

const getFilesWithModifiedProps = modifiedFiles => {
  const filesWithModifiedProps = [];

  Object.keys(modifiedFiles).forEach(fileRelativePath => {
    const { contentFromSourceBranch, contentFromPr } = modifiedFiles[
      fileRelativePath
    ];
    const { changeDetected, changeMessage } = didPropsChange(
      contentFromSourceBranch,
      contentFromPr,
    );
    if (changeDetected) {
      filesWithModifiedProps.push({
        fileRelativePath,
        changeMessage,
      });
    }
  });

  return filesWithModifiedProps;
};

const index = modifiedFiles => {
  const invalidFilesList = getFilesWithModifiedProps(modifiedFiles);
  if (!invalidFilesList.length) {
    return;
  }

  invalidFilesList.forEach(invalidFile => {
    console.error(
      messages.fileChanged(
        invalidFile.fileRelativePath,
        invalidFile.changeMessage,
      ),
    );
  });

  throw new Error(messages.verificationFailed());
};

module.exports = index;
