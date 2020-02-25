const shell = require('shelljs');

const switchToSourceBranch = (sourceBranch = 'master') => {
  return new Promise(resolve => {
    shell
      .exec(`git checkout ${sourceBranch}`, {
        async: true,
        silent: true,
      })
      .on('exit', code => (code !== 0 ? resolve(false) : resolve(true)));
  });
};

module.exports = switchToSourceBranch;
