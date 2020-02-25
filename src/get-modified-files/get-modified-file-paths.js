const shell = require('shelljs');

const getModifiedFilePaths = async (sourceBranch = 'master') =>
  new Promise(resolve => {
    const { stdout } = shell.exec(
      `git diff --name-only HEAD $(git merge-base HEAD ${sourceBranch})`,
      {
        async: true,
        silent: true,
      },
    );
    stdout.on('data', filePaths => {
      resolve(filePaths.split('\n').filter(Boolean));
    });
    stdout.on('close', () => {
      resolve([]);
    });
  });
module.exports = getModifiedFilePaths;
