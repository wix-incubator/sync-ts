const _ = require('lodash');
const havePropTypesChanged = require('./have-prop-types-changed');

const getInvalidIndices = (targetFileComponents, sourceFileComponents) => {
  const invalidComponentIndices = [];

  targetFileComponents.forEach((targetFileComponent, index) => {
    const sourceFileComponent = sourceFileComponents[index];
    if (
      !_.isEqual(
        sourceFileComponent.displayName,
        targetFileComponent.displayName,
      ) ||
      havePropTypesChanged(sourceFileComponent, targetFileComponent)
    ) {
      invalidComponentIndices.push(index);
    }
  });

  return invalidComponentIndices;
};

module.exports = getInvalidIndices;
