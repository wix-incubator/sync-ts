const resolveFiles = (prFiles = [], sourceBranchFiles = []) => {
  const filePaths = prFiles.map(prFile => prFile.relativePath);
  const resolvedFiles = filePaths.reduce((files, currFilePath) => {
    const file = {
      [currFilePath]: {
        contentFromPr: getFileContent(prFiles, currFilePath),
        contentFromSourceBranch: getFileContent(
          sourceBranchFiles,
          currFilePath,
        ),
      },
    };
    return { ...file, ...files };
  }, {});
  return resolvedFiles;
};

function getFileContent(files = [], filePath) {
  return (
    (files.find(({ relativePath }) => relativePath === filePath) || {})
      .content || ''
  );
}
module.exports = resolveFiles;
