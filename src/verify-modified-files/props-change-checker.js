const messages = require('./messages');
const getAllComponentsDataByDisplayName = require('./get-all-components-data');
const getInvalidIndices = require('./get-invalid-indices');

const compAddedToFile = (sourceFileComponents, prFileComponents) =>
  !sourceFileComponents && prFileComponents;
const compDeletedFromFile = (sourceFileComponents, prFileComponents) =>
  sourceFileComponents && !prFileComponents;
const noComponentsInFile = (sourceFileComponents, prFileComponents) =>
  !sourceFileComponents && !prFileComponents;
const differentNumberOfComponents = (sourceFileComponents, prFileComponents) =>
  sourceFileComponents.length !== prFileComponents.length;

const invalidIndicesChangeMessage = (
  prFileComponents,
  invalidComponentIndices,
) => {
  let changeMessage = '';
  invalidComponentIndices.forEach(
    index =>
      (changeMessage += `${messages.propsChanged(
        prFileComponents[index].displayName,
      )}\n`),
  );

  return changeMessage.trim();
};

const didPropsChange = (sourceFile, fileFromPr) => {
  const sourceFileComponents = getAllComponentsDataByDisplayName(sourceFile);
  const prFileComponents = getAllComponentsDataByDisplayName(fileFromPr);

  if (compAddedToFile(sourceFileComponents, prFileComponents)) {
    return {
      changeDetected: true,
      changeMessage: messages.compAdded(),
    };
  }
  if (compDeletedFromFile(sourceFileComponents, prFileComponents)) {
    return {
      changeDetected: true,
      changeMessage: messages.compDeleted(),
    };
  }
  if (noComponentsInFile(sourceFileComponents, prFileComponents)) {
    return {
      changeDetected: false,
    };
  }
  if (differentNumberOfComponents(sourceFileComponents, prFileComponents)) {
    const changeMessage =
      sourceFileComponents.length < prFileComponents.length
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
