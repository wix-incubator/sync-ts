const getModifiedFilePaths = require('./get-modified-file-paths');
const filterIrrelevantPaths = require('./filter-irrelevant-paths');
const getFilesContent = require('./get-files-content');
const switchToSourceBranch = require('./switch-to-source-branch');
const resolveFiles = require('./resolve-files');

async function getModifiedFiles(sourceBranch = 'master') {
  return new Promise(async (resolve, reject) => {
    const rawFilePaths = await getModifiedFilePaths(sourceBranch);
    const filePaths = filterIrrelevantPaths(rawFilePaths);
    const filesFromPr = await getFilesContent(filePaths);

    const isSwitchSuccessful = await switchToSourceBranch(sourceBranch);
    if (isSwitchSuccessful) {
      const filesFromSourceBranch = await getFilesContent(filePaths);
      const files = await resolveFiles(filesFromPr, filesFromSourceBranch);
      resolve(files);
    } else {
      reject(new Error(`cannot switch to ${sourceBranch}`)); // export to errors file
    }
  });
}

module.exports = getModifiedFiles;
