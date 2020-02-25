const getModifiedFilePaths = require('./get-modified-file-paths');
const getFilesContent = require('./get-files-content');
const switchToSrouceBranch = require('./switch-to-source-branch');
const resolveFiles = require('./resolve-files');

async function getModifiedFiles(sourceBranch = 'master') {
  return new Promise(async (resolve, reject) => {
    const filePaths = await getModifiedFilePaths(sourceBranch);
    const filesFromPr = await getFilesContent(filePaths);

    const isSwitchSuccessfull = await switchToSrouceBranch(sourceBranch);
    if (isSwitchSuccessfull) {
      const filesFromSourceBranch = await getFilesContent(filePaths);
      const files = await resolveFiles(filesFromPr, filesFromSourceBranch);
      resolve(files);
    } else {
      reject(new Error('cannot switch to master')); // export to errors file
    }
  });
}

module.exports = getModifiedFiles;
