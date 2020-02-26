const _ = require('lodash');

const componentDataNoProps = {
  description: 'General component description.',
  displayName: 'MyComponent',
  methods: [],
};

const propsMock = ({
  baseType = 'number',
  isRequired = false,
  description = 'some-desc',
  defaultValue = '123',
} = {}) => ({
  propsMock: {
    type: {
      name: baseType,
    },
    required: isRequired,
    description,
    defaultValue: {
      value: defaultValue,
      computed: false,
    },
  },
});

const baseProps1 = propsMock({
  baseType: 'number',
  isRequired: false,
  description: 'prop1 description',
  defaultValue: '42',
});

const baseProps2 = {
  prop2: {
    type: {
      name: 'custom',
      raw: 'function(props, propName, componentName) {\n  // ...\n}',
    },
    required: false,
    description: `Description of prop 'prop2' (a custom validation function).`,
    defaultValue: {
      value: '21',
      computed: false,
    },
  },
};

const propWithUnionType = partialType => ({
  myProp: {
    type: {
      name: 'union',
      value: [
        {
          name: partialType,
        },
        {
          name: 'string',
        },
      ],
    },
    required: true,
    description: '',
  },
});

const defaultProps = { ...baseProps1, ...baseProps2 };

const componentDataMock = (props = defaultProps) =>
  _.assign({}, componentDataNoProps, { props });

module.exports = {
  componentDataNoProps,
  baseProps1,
  baseProps2,
  propsMock,
  propWithUnionType,
  componentDataMock,
};
