const havePropTypesChanged = require('../src/verify-modified-files/have-prop-types-changed');
const {
  componentDataNoProps,
  baseProps1,
  baseProps2,
  propWithUnionType,
  componentDataMock,
  propsMock,
} = require('../drivers/mocks/component-data');

describe('havePropTypesChanged', () => {
  it('should return true for components with different props', () => {
    const sourceComp = componentDataMock(baseProps1);
    const prComp = componentDataMock(baseProps2);

    expect(havePropTypesChanged(sourceComp, prComp)).toBe(true);
  });

  it('should return false for identical components', () => {
    const sourceComp = componentDataMock();
    const prComp = componentDataMock();

    expect(havePropTypesChanged(sourceComp, prComp)).toBe(false);
  });

  it('should return true when adding props', () => {
    const sourceComp = componentDataNoProps;
    const prComp = componentDataMock();

    expect(havePropTypesChanged(sourceComp, prComp)).toBe(true);
  });

  it('should return true when deleting props', () => {
    const sourceComp = componentDataMock();
    const prComp = componentDataNoProps;

    expect(havePropTypesChanged(sourceComp, prComp)).toBe(true);
  });

  it('performs a deep comparison between props - returns true for deep changes', () => {
    const sourceComp = componentDataMock(propWithUnionType('number'));
    const prComp = componentDataMock(propWithUnionType('object'));

    expect(havePropTypesChanged(sourceComp, prComp)).toBe(true);
  });

  it('should return false for default value changes', () => {
    const sourceComp = componentDataMock(
      propsMock({ baseType: 'string', defaultValue: 'source' }),
    );
    const prComp = componentDataMock(
      propsMock({ baseType: 'string', defaultValue: 'target' }),
    );

    expect(havePropTypesChanged(sourceComp, prComp)).toBe(false);
  });

  it('should return false for prop description changes', () => {
    const sourceComp = componentDataMock(
      propsMock({ baseType: 'string', description: 'source' }),
    );
    const prComp = componentDataMock(
      propsMock({ baseType: 'string', description: 'target' }),
    );

    expect(havePropTypesChanged(sourceComp, prComp)).toBe(false);
  });

  it('should return true for prop required change', () => {
    const sourceComp = componentDataMock(
      propsMock({ baseType: 'string', isRequired: true }),
    );
    const prComp = componentDataMock(
      propsMock({ baseType: 'string', isRequired: false }),
    );

    expect(havePropTypesChanged(sourceComp, prComp)).toBe(true);
  });
});
