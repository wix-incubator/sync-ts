# This package has been deprecated
## Package no longer supported. Use at your own risk.

# sync-ts
A package for syncing prop types with Typescript types


## Install

```shell
$ npm i -D
```

## Test

```shell
$ npm run test
```

## Run

```shell
$ npx sync-ts
```
## Optional Flags
**--sourceBranch**: *string* - source branch to compare PR with. `default: master`

**--excludePath**: *string* - paths to exclude
    
**--skip**: *boolean* - optional escape hatch. `default: false`  

Usage examples: 
```shell
$ npx sync-ts

$ npx sync-ts --sourceBranch='my-branch' 

$ npx sync-ts --sourceBranch='my-branch' --excludePath='src/.*/docs/.*' --excludePath='src/.*/examples/.*'
```
## Add tool as a pre-push hook using [husky](https://github.com/typicode/husky)
```shell
// package.json
{
  "husky": {
    "hooks": {
      "pre-push": "sync-ts",
    }
  }
}
```
## Consume in CI
1. Add script into npm scripts inside `package.json`
2. Submit a PR and wait for build to run in CI
3. Review build log - in case where prop types and d.ts files are out of sync - build will break and all discrepancies will be  logged inside build log.

Example: `"prebuild": "if [ \"$agentType\" = \"pullrequest\" ]; then sync-ts; fi"`
