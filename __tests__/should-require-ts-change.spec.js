const shouldRequireTSChange = require('../src/should-require-ts-change');
const shouldRequireDriver = require('../drivers/should-require-ts-change.driver');

const { fileWithComponent, fileWithTwoComponents } = shouldRequireDriver

//More things to test - isRequired
describe('shouldRequireTSChange', () => {
  it('should require changes for props addition', () => {
    const firstFile = fileWithComponent({
      propTypes: `prop1: PropTypes.number,
       prop2: PropTypes.string`,
    });
    const secondFile = fileWithComponent({
      propTypes:
        'prop1: PropTypes.number, prop2: PropTypes.string, prop3: PropTypes.object',
    });

    expect(shouldRequireTSChange(firstFile, secondFile)).toMatchObject({
      response: true,
      message: 'PropTypes were changed in DummyComponent component',
    });
  });

  it('should require changes when removing props', () => {
    const firstFile = fileWithComponent({
      propTypes: `prop1: PropTypes.number,
       prop2: PropTypes.string`,
    });
    const secondFile = fileWithComponent({
      propTypes: 'prop2: PropTypes.string',
    });

    expect(shouldRequireTSChange(firstFile, secondFile)).toMatchObject({
      response: true,
      message: 'PropTypes were changed in DummyComponent component',
    });
  });

  it('should require changes when adding a new file', () => {
    const firstFile = '';

    const secondFile = fileWithComponent({
      propTypes: `prop1: PropTypes.number,
       prop2: PropTypes.string`,
    });

    expect(shouldRequireTSChange(firstFile, secondFile)).toMatchObject({
      response: true,
      message: 'An exported component was added to, or removed from, the file',
    });
  });

  it('should require changes when deleting a file', () => {
    const firstFile = fileWithComponent({
      propTypes: `prop1: PropTypes.number,
       prop2: PropTypes.string`,
    });
    const secondFile = '';

    expect(shouldRequireTSChange(firstFile, secondFile)).toMatchObject({
      response: true,
      message: 'An exported component was added to, or removed from, the file',
    });
  });

  it('should require changes when changing the exported component display name', () => {
    const firstFile = fileWithComponent();
    const secondFile = fileWithComponent({ displayName: `'myNewComp'` });

    expect(shouldRequireTSChange(firstFile, secondFile)).toMatchObject({
      response: true,
      message: 'PropTypes were changed in myNewComp component',
    });
  });

  it('should not require changes when providing a file with no components', () => {
    const firstFile = 'const MY_CONST = 5';
    const secondFile = 'const MY_CONST = 6';

    expect(shouldRequireTSChange(firstFile, secondFile)).toMatchObject({
      response: false,
    });
  });

  it('should not require changes for unchanged file', () => {
    expect(
      shouldRequireTSChange(fileWithComponent(), fileWithComponent()),
    ).toMatchObject({ response: false });
  });

  it('should not require changes for default props changes', () => {
    const firstFile = fileWithComponent({
      propTypes: 'prop1: PropTypes.number',
      defaultPropValues: `prop1: 0`,
    });
    const secondFile = fileWithComponent({
      propTypes: 'prop1: PropTypes.number',
      defaultPropValues: `prop1: 1`,
    });

    expect(shouldRequireTSChange(firstFile, secondFile)).toMatchObject({
      response: false,
    });
  });

  describe('file with two components', () => {
    it('should require changes for prop changes in first file', () => {
      const firstFile = fileWithTwoComponents({firstCompPropTypes: 'prop1: PropTypes.string'})
      const secondFile = fileWithTwoComponents({firstCompPropTypes: 'prop1: PropTypes.string.isRequired'})

      expect(shouldRequireTSChange(firstFile, secondFile)).toMatchObject({
        response: true,
        message: 'PropTypes were changed in Comp1 component',
      });
    });

    it('should require changes for prop changes in second file', () => {
      const firstFile = fileWithTwoComponents({secondCompPropTypes: 'myProp: PropTypes.string'})
      const secondFile = fileWithTwoComponents({secondCompPropTypes: 'myOtherProp: PropTypes.string'})

      expect(shouldRequireTSChange(firstFile, secondFile)).toMatchObject({
        response: true,
        message: 'PropTypes were changed in Comp2 component',
      });
    });
  });
});
