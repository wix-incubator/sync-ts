#!/usr/bin/env node
const minimist = require('minimist');
const getModifiedFiles = require('./get-modified-files');
const verifyModifiedFiles = require('./verify-modified-files');

(async () => {
  const args = minimist(process.argv.slice(2), {
    string: ['sourceBranch', 'excludePaths'],
    boolean: ['skip'],
  });
  const { sourceBranch, skip = false } = args;
  const excludePaths = Array.isArray(args.excludePaths)
    ? args.excludePaths
    : (args.excludePaths
    ? [args.excludePaths]
    : []);
  console.info(
    `sync-ts params: sourceBranch=${sourceBranch} excludePaths=${excludePaths} skip=${skip}`,
  );
  if (skip) {
    console.info('sync-ts: all checks skipped.');
    process.exit(0);
  }

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
