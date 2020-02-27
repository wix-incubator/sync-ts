const didPropsChange = require(`./props-change-checker`);
const errorMessages = require('../utils/error-messages');

const getFilesWithModifiedProps = modifiedFiles => {
  const filesWithModifiedProps = [];

  Object.keys(modifiedFiles).forEach(fileRelativePath => {
    const { contentFromSourceBranch, contentFromTargetBranch } = modifiedFiles[
      fileRelativePath
    ];
    const { changeDetected, changeMessage } = didPropsChange(
      contentFromSourceBranch,
      contentFromTargetBranch,
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
      errorMessages.fileChanged(
        invalidFile.fileRelativePath,
        invalidFile.changeMessage,
      ),
    );
  });

  throw new Error(errorMessages.verificationFailed());
};

module.exports = index;
