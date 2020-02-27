const fs = require('fs');
const getGitRootPath = require('./get-git-root-path');

const getFilesContent = async (filePaths = []) =>
  new Promise(async resolve => {
    console.log('### cwd', process.cwd());
    const deferredFiles = filePaths.map(async relativePath => ({
      relativePath,
      content: await getFileContent(relativePath),
    }));
    resolve(await Promise.all(deferredFiles));
  });

async function getFileContent(filePath) {
  return new Promise(async resolve => {
    const gitRootPath = await getGitRootPath();
    console.log('### gitRootPath', gitRootPath);
    fs.readFile(`${gitRootPath}/${filePath}`, 'utf8', (err, data) => {
      if (!err) {
        console.log('### data', data);
        resolve(data);
      } else {
        console.log('### error');
        resolve('');
      }
    });
  });
}

module.exports = getFilesContent;
