const shell = require('shelljs');

const getGitRootPath = () =>
  new Promise(resolve => {
    shell
      .exec('git rev-parse --show-toplevel', {
        async: true,
        silent: true,
      })
      .stdout.on('data', gitRootPath => {
        resolve(gitRootPath.replace(/(\r\n|\n|\r)/gm, ''));
      });
  });

module.exports = getGitRootPath;
