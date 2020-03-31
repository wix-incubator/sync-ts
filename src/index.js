#!/usr/bin/env node
const minimist = require('minimist');
const getModifiedFiles = require('./get-modified-files');
const verifyModifiedFiles = require('./verify-modified-files');

(async () => {
  const args = minimist(process.argv.slice(2), {
    string: ['sourceBranch', 'excludePath'],
    boolean: ['skip'],
  });
  const { sourceBranch, skip = false } = args;
  const listOfPathsToExclude = Array.isArray(args.excludePath)
    ? args.excludePath
    : args.excludePath
    ? [args.excludePath]
    : [];
  console.info(
    `sync-ts params: sourceBranch=${sourceBranch} excludePaths=${listOfPathsToExclude} skip=${skip}`,
  );
  if (skip) {
    console.info('sync-ts: all checks skipped.');
    process.exit(0);
  }

  try {
    const modifiedFiles = await getModifiedFiles(
      sourceBranch,
      listOfPathsToExclude,
    );
    verifyModifiedFiles(modifiedFiles);
    console.info('sync-ts: all checks passed.');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
