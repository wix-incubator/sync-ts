/* eslint-disable no-console */
const reactDocs = require('react-docgen');
const _ = require('lodash');

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
  const prComponentPropTypes = _.mapValues(prFileComponentData.props, props =>
    _.pick(props, ['type', 'required']),
  );

  return !_.isEqual(sourceComponentPropTypes, prComponentPropTypes);
};

const shouldRequireTsChange = (sourceFile, fileFromPr) => {
  const sourceFileComponents = getAllComponentsDataByDisplayName(
    sourceFile,
  );
  const prFileComponents = getAllComponentsDataByDisplayName(fileFromPr);

  if (
    //comp created / comp deleted with relevant messages - in functions
    (sourceFileComponents && !prFileComponents) ||
    (!sourceFileComponents && prFileComponents)
  ) {
    return {
      response: true,
      //consts
      message: 'An exported component was added to, or removed from, the file',
    };
  }
  if (!sourceFileComponents && !prFileComponents) {
    return {
      response: false,
    };
  }

  if (sourceFileComponents.length !== prFileComponents.length) {
    const message =
      sourceFileComponents.length < prFileComponents.length
        ? 'An exported component was added to the file'
        : 'An exported component was deleted from the file';
    return {
      response: true,
      message,
    };
  }

  //get all bad indices
  const invalidComponentIndex = prFileComponents.findIndex(
    (prFileComponent, index) => {
      const sourceFileComponent = sourceFileComponents[index];
      if (
        !_.isEqual(sourceFileComponent.displayName, prFileComponent.displayName)
      ) {
        return true;
      }
      return havePropTypesChanged(sourceFileComponent, prFileComponent);
    },
  );

  return invalidComponentIndex < 0
    ? { response: false }
    : {
        response: true,
        message: `PropTypes were changed in ${prFileComponents[invalidComponentIndex].displayName} component`,
      };
};

module.exports = shouldRequireTsChange;
