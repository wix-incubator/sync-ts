# sync-ts
A package for syncing prop types with Typescript types


## Install

```shell
npm i
```

## Test

```shell
npm run test
```

## Run

```shell
npx sync-ts
```
## Optional Flags
**sourceBranch**: *string* - source branch to compare PR with. `default: master`
**skip**: *boolean* - optional escape hatch. `default: false`

## Consume in CI
1. Add script into npm scripts inside `package.json`
2. Submit a PR and wait for build to run in CI
3. Review build log - in case where prop types and d.ts files are out of sync - build will break and all discrepancies will be  logged inside build log.

Example: `"prebuild": "if [ \"$agentType\" = \"pullrequest\" ]; then sync-ts; fi"`
