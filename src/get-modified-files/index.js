const getModifiedFilePaths = require('./get-modified-file-paths');
const filterIrrelevantPaths = require('./filter-irrelevant-paths');
const getFilesContent = require('./get-files-content');
const switchToBranch = require('./switch-to-branch');
const getCurrentBranch = require('./get-current-branch');
const resolveFiles = require('./resolve-files');
const errorMessages = require('../utils/error-messages');

async function getModifiedFiles(sourceBranch = 'master', excludePaths) {
  return new Promise(async (resolve, reject) => {
    const rawFilePaths = await getModifiedFilePaths(sourceBranch);
    const filePaths = filterIrrelevantPaths(rawFilePaths, excludePaths);
    const filesFromPr = await getFilesContent(filePaths);
    const targetBranch = await getCurrentBranch();
    const isSwitchSuccessful = await switchToBranch(sourceBranch);
    if (isSwitchSuccessful) {
      const filesFromSourceBranch = await getFilesContent(filePaths);
      const files = await resolveFiles(filesFromPr, filesFromSourceBranch);
      await switchToBranch(targetBranch);
      resolve(files);
    } else {
      reject(new Error(errorMessages.branchChangeFailed(sourceBranch)));
    }
  });
}

module.exports = getModifiedFiles;
