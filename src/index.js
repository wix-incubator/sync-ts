#!/usr/bin/env node

const getModifiedFiles = require('./get-modified-files');
const verifyModifiedFiles = require('./verify-modified-files');

const { sourceBranch, skip } = process.env;
(async () => {
  if (skip) {
    console.info('sync-ts: all checks skipped.');
    process.exit(0);
  }
  try {
    const modifiedFiles = await getModifiedFiles(sourceBranch);
    verifyModifiedFiles(modifiedFiles);
    console.info('sync-ts: all checks passed.');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
