const shell = require('shelljs');

const switchToBranch = (branch = 'master') => {
  return new Promise(resolve => {
    shell
      .exec(`git checkout ${branch}`, {
        async: true,
        silent: true,
      })
      .on('exit', handleException);
    function handleException(code) {
      return code !== 0 ? resolve(false) : resolve(true);
    }
  });
};

module.exports = switchToBranch;
