const fs = require('fs');
const getGitRootPath = require('./get-git-root-path');

const getFilesContent = async (filePaths = []) =>
  new Promise(async resolve => {
    const deferredFiles = filePaths.map(async relativePath => ({
      relativePath,
      content: await getFileContent(relativePath),
    }));
    resolve(await Promise.all(deferredFiles));
  });

async function getFileContent(filePath) {
  return new Promise(async resolve => {
    const gitRootPath = await getGitRootPath();
    fs.readFile(`${gitRootPath}/${filePath}`, 'utf8', (err, data) => {
      // TODO: go to nearest folder that contains .git
      if (!err) {
        resolve(data);
      } else {
        resolve('');
      }
    });
  });
}

module.exports = getFilesContent;
