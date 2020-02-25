const defaultPropTypes = `prop1: PropTypes.string,
prop2: PropTypes.object,
prop3: PropTypes.number`;

const defaultDefaultProps = '';
const defaultDisplayName = `'DummyComponent'`;

const fileWithComponent = ({
  propTypes = defaultPropTypes,
  defaultPropValues = defaultDefaultProps,
  displayName = defaultDisplayName,
} = {}) => `
import PropTypes from 'prop-types';

const DummyComponent = ({
}) => {
  return (
    <div>
      'Hey'
    </div>
  );
};

DummyComponent.propTypes = {
  ${propTypes}
};

DummyComponent.defaultProps = {
${defaultPropValues}
};

DummyComponent.displayName = ${displayName};

export default DummyComponent;`;

const fileWithTwoComponents = ({
  firstCompPropTypes = defaultPropTypes,
  secondCompPropTypes = defaultPropTypes,
} = {}) => `
import PropTypes from 'prop-types';

const Comp1 = ({}) => (
  <div> 'Hey' </div>
);

Comp1.propTypes = {
  ${firstCompPropTypes}
};

const Comp2 = ({}) => (
  <div> 'Hey' </div>
);

Comp2.propTypes = {
  ${secondCompPropTypes}
};

export {
  Comp1,
  Comp2,
};`;

module.exports = {
  fileWithComponent,
  fileWithTwoComponents,
};
