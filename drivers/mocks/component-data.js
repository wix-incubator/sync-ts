const _ = require('lodash')

const baseComponentData = {
  description: 'General component description.',
  displayName: 'MyComponent',
  methods: [],
}

const componentData = (props = defaultProps) => _.assign({}, baseComponentData, {props})

const defaultProps = {
  foo: {
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
  bar: {
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
