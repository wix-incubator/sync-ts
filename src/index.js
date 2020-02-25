const getModifiedFiles = require('./get-modified-files');

const sourceBranch = process.argv[3];

getModifiedFiles(sourceBranch)
  .then(data => {
    console.log('data', data);
    process.exit(0);
  })
  .catch(err => {
    console.error(err); // eslint-disable-line no-console
    process.exit(1);
  });
