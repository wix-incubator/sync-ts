const _ = require('lodash');

const havePropTypesChanged = (sourceFileComponentData, targetFileComponentData) => {
  const sourceComponentPropTypes = _.mapValues(
    sourceFileComponentData.props,
    props => _.pick(props, ['type', 'required']),
  );
  const prComponentPropTypes = _.mapValues(targetFileComponentData.props, props =>
    _.pick(props, ['type', 'required']),
  );

  return !_.isEqual(sourceComponentPropTypes, prComponentPropTypes);
};

module.exports = havePropTypesChanged;
