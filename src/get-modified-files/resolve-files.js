const resolveFiles = (targetBranchFiles = [], sourceBranchFiles = []) => {
  if (!targetBranchFiles || !sourceBranchFiles) {
    return {};
  }
  const filePaths = targetBranchFiles.map(
    targetBranchFile => targetBranchFile.relativePath,
  );
  const resolvedFiles = filePaths.reduce((files, currFilePath) => {
    const file = {
      [currFilePath]: {
        contentFromPr: getFileContent(targetBranchFiles, currFilePath),
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
