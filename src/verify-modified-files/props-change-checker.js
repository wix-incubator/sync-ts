const _ = require('lodash');
const errorMessages = require('../utils/error-messages');
const getAllComponentsDataByDisplayName = require('./get-all-components-data');
const getInvalidIndices = require('./get-invalid-indices');

const componentChecker = (sourceFileComponents, targetFileComponents) => ({
  compAddedToFile: !sourceFileComponents && targetFileComponents,
  compDeletedFromFile: sourceFileComponents && !targetFileComponents,
  noComponentsInFile: !sourceFileComponents && !targetFileComponents,
  differentNumberOfComponents:
    _.get(sourceFileComponents, 'length') !==
    _.get(targetFileComponents, 'length'),
});

const invalidIndicesChangeMessage = (
  targetFileComponents,
  invalidComponentIndices,
) => {
  let changeMessage = '';
  invalidComponentIndices.forEach(
    index =>
      (changeMessage += `${errorMessages.propsChanged(
        targetFileComponents[index].displayName,
      )}`),
  );

  return changeMessage;
};

const didPropsChange = (sourceFile, targetFile) => {
  const sourceFileComponents = getAllComponentsDataByDisplayName(sourceFile);
  const targetFileComponents = getAllComponentsDataByDisplayName(targetFile);

  const compChecker = componentChecker(
    sourceFileComponents,
    targetFileComponents,
  );

  if (compChecker.compAddedToFile) {
    return {
      changeDetected: true,
      changeMessage: errorMessages.compAdded(),
    };
  }
  if (compChecker.compDeletedFromFile) {
    return {
      changeDetected: true,
      changeMessage: errorMessages.compDeleted(),
    };
  }
  if (compChecker.noComponentsInFile) {
    return {
      changeDetected: false,
    };
  }
  if (compChecker.differentNumberOfComponents) {
    const changeMessage =
      _.get(sourceFileComponents, 'length', 0) <
      _.get(targetFileComponents, 'length', 0)
        ? errorMessages.compAdded()
        : errorMessages.compDeleted();
    return {
      changeDetected: true,
      changeMessage,
    };
  }

  const invalidComponentIndices = getInvalidIndices(
    targetFileComponents,
    sourceFileComponents,
  );

  return invalidComponentIndices.length
    ? {
        changeDetected: true,
        changeMessage: invalidIndicesChangeMessage(
          targetFileComponents,
          invalidComponentIndices,
        ),
      }
    : { changeDetected: false };
};

module.exports = didPropsChange;
