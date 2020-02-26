const _ = require('lodash');
const messages = require('./messages');
const getAllComponentsDataByDisplayName = require('./get-all-components-data');
const getInvalidIndices = require('./get-invalid-indices');

const componentChecker = (sourceFileComponents, prFileComponents) => ({
  compAddedToFile: !sourceFileComponents && prFileComponents,
  compDeletedFromFile: sourceFileComponents && !prFileComponents,
  noComponentsInFile: !sourceFileComponents && !prFileComponents,
  differentNumberOfComponents:
    _.get(sourceFileComponents, 'length') !== _.get(prFileComponents, 'length'),
});

const invalidIndicesChangeMessage = (
  prFileComponents,
  invalidComponentIndices,
) => {
  let changeMessage = '';
  invalidComponentIndices.forEach(
    index =>
      (changeMessage += `${messages.propsChanged(
        prFileComponents[index].displayName,
      )}`),
  );

  return changeMessage;
};

const didPropsChange = (sourceFile, fileFromPr) => {
  const sourceFileComponents = getAllComponentsDataByDisplayName(sourceFile);
  const prFileComponents = getAllComponentsDataByDisplayName(fileFromPr);

  const compChecker = componentChecker(sourceFileComponents, prFileComponents);

  if (compChecker.compAddedToFile) {
    return {
      changeDetected: true,
      changeMessage: messages.compAdded(),
    };
  }
  if (compChecker.compDeletedFromFile) {
    return {
      changeDetected: true,
      changeMessage: messages.compDeleted(),
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
      _.get(prFileComponents, 'length', 0)
        ? messages.compAdded()
        : messages.compDeleted();
    return {
      changeDetected: true,
      changeMessage,
    };
  }

  const invalidComponentIndices = getInvalidIndices(
    prFileComponents,
    sourceFileComponents,
  );

  return invalidComponentIndices.length
    ? {
        changeDetected: true,
        changeMessage: invalidIndicesChangeMessage(
          prFileComponents,
          invalidComponentIndices,
        ),
      }
    : { changeDetected: false };
};

module.exports = didPropsChange;
