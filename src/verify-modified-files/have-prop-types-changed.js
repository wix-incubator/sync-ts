const _ = require('lodash');

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

module.exports = havePropTypesChanged;
