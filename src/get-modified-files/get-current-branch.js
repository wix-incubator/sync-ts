const shell = require('shelljs');

const getCurrentBranch = () => {
  return new Promise(resolve => {
    shell
      .exec(`git branch`, {
        async: true,
        silent: true,
      })
      .stdout.on('data', branch => {
        resolve(branch.replace(/(\r\n|\n|\r|\*| )/gm, ''));
      });
  });
};

module.exports = getCurrentBranch;
