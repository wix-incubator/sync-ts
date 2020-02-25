const _ = require('lodash');
const havePropTypesChanged = require('./have-prop-types-changed');

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

module.exports = getInvalidIndices;
