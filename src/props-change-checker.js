/* eslint-disable no-console */
const reactDocs = require('react-docgen');
const _ = require('lodash');
const getMessage = require('./messages');

const compAddedToFile = (sourceFileComponents, prFileComponents) =>
  !sourceFileComponents && prFileComponents;
const compDeletedFromFile = (sourceFileComponents, prFileComponents) =>
  sourceFileComponents && !prFileComponents;
const noComponentsInFile = (sourceFileComponents, prFileComponents) =>
  !sourceFileComponents && !prFileComponents;
const differentNumberOfComponents = (sourceFileComponents, prFileComponents) =>
  sourceFileComponents.length !== prFileComponents.length;

const getAllComponentsDataByDisplayName = file => {
  let result;
  try {
    result = _.sortBy(
      reactDocs.parse(
        file,
        reactDocs.resolver.findAllExportedComponentDefinitions,
        undefined,
        { filename: '' },
      ),
      ['displayName'],
    );
  } catch {
    result = undefined;
  }
  return result;
};

const havePropTypesChanged = (sourceFileComponentData, prFileComponentData) => {
  const sourceComponentPropTypes = _.mapValues(
    sourceFileComponentData.props,
    props => _.pick(props, ['type', 'required']),
  );
  const prComponentPropTypes = _.mapValues(
    prFileComponentData.props,
    props => _.pick(props, ['type', 'required']),
  );

  return !_.isEqual(sourceComponentPropTypes, prComponentPropTypes);
};

const getInvalidIndices = (prFileComponents, sourceFileComponents) => {
  const invalidComponentIndices = [];

  prFileComponents.forEach((prFileComponent, index) => {
    const sourceFileComponent = sourceFileComponents[index];
    if (
      !_.isEqual(
        sourceFileComponent.displayName,
        prFileComponent.displayName,
      ) ||
      havePropTypesChanged(sourceFileComponent, prFileComponent)
    ) {
      invalidComponentIndices.push(index);
    }
  });

  return invalidComponentIndices;
};

const invalidIndicesChangeMessage = (
  prFileComponents,
  invalidComponentIndices,
) => {
  let changeMessage = '';
  invalidComponentIndices.forEach(
    index =>
      (changeMessage += `${getMessage.propsChanged(
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
      changeMessage: getMessage.compAdded(),
    };
  }
  if (compDeletedFromFile(sourceFileComponents, prFileComponents)) {
    return {
      changeDetected: true,
      changeMessage: getMessage.compDeleted(),
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
        ? getMessage.compAdded()
        : getMessage.compDeleted();
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