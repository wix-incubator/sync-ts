#!/usr/bin/env node

const getModifiedFiles = require('./get-modified-files');
const verifyModifiedFiles = require('./verify-modified-files');

const sourceBranch = process.argv[3];

(async () => {
  try {
    const modifiedFiles = await getModifiedFiles(sourceBranch);
    verifyModifiedFiles(modifiedFiles);
    process.exit(0);
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
    process.exit(1);
  }
})();
