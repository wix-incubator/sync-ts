#!/usr/bin/env node

const getModifiedFiles = require('./get-modified-files');
const verifyModifiedFiles = require('./verify-modified-files');

const {
  sourceBranch,
  excludePaths: excludePathsRaw,
  skip = false,
} = process.env;
(async () => {
  console.log(
    `sync-ts params: sourceBranch=${sourceBranch} excludePaths=${excludePathsRaw} skip=${skip}`,
  );
  if (skip) {
    console.info('sync-ts: all checks skipped.');
    process.exit(0);
  }
  const excludePaths = excludePathsRaw
    ? excludePathsRaw.split(';').filter(p => p.trim() !== '')
    : [];
  try {
    const modifiedFiles = await getModifiedFiles(sourceBranch, excludePaths);
    verifyModifiedFiles(modifiedFiles);
    console.info('sync-ts: all checks passed.');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
