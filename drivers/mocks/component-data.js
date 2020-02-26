const _ = require('lodash');

const baseComponentData = {
  description: 'General component description.',
  displayName: 'MyComponent',
  methods: [],
};

const baseProp1 = {
  prop1: {
    type: {
      name: 'number',
    },
    required: false,
    description: `Description of prop 'foo'.`,
    defaultValue: {
      value: '42',
      computed: false,
    },
  },
};

const baseProp2 = {
  prop2: {
    type: {
      name: 'custom',
      raw: 'function(props, propName, componentName) {\n  // ...\n}',
    },
    required: false,
    description: `Description of prop 'bar' (a custom validation function).`,
    defaultValue: {
      value: '21',
      computed: false,
    },
  },
};

const defaultProps = { ...baseProp1, ...baseProp2 };

const componentData = (props = defaultProps) =>
  _.assign({}, baseComponentData, { props });

module.exports = {
  baseComponentData,
  baseProp1,
  baseProp2,
  componentData,
}
