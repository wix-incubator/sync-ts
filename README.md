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

## Consume in CI
1. Add script into npm scripts inside `package.json`  
2. Submit a PR

Example: `"prebuild": "if [ \"$agentType\" = \"pullrequest\" ]; then sync-ts; fi"`
