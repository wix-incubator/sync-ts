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

module.exports = getAllComponentsDataByDisplayName;
