const didPropsChange = require('../src/verify-modified-files/props-change-checker');
const fileContentMocks = require('../drivers/mocks/file-content-mocks');

const { fileWithComponent, fileWithTwoComponents } = fileContentMocks;

describe('didPropsChange', () => {
  it('should detect change for props addition', () => {
    const firstFile = fileWithComponent({
      propTypes: `prop1: PropTypes.number,
       prop2: PropTypes.string`,
    });
    const secondFile = fileWithComponent({
      propTypes:
        'prop1: PropTypes.number, prop2: PropTypes.string, prop3: PropTypes.object',
    });

    expect(didPropsChange(firstFile, secondFile)).toMatchObject({
      changeDetected: true,
      changeMessage: 'PropTypes were changed in DummyComponent component',
    });
  });

  it('should detect change when removing props', () => {
    const firstFile = fileWithComponent({
      propTypes: `prop1: PropTypes.number,
       prop2: PropTypes.string`,
    });
    const secondFile = fileWithComponent({
      propTypes: 'prop2: PropTypes.string',
    });

    expect(didPropsChange(firstFile, secondFile)).toMatchObject({
      changeDetected: true,
      changeMessage: 'PropTypes were changed in DummyComponent component',
    });
  });

  it('should detect change when adding a new file', () => {
    const firstFile = '';

    const secondFile = fileWithComponent({
      propTypes: `prop1: PropTypes.number,
       prop2: PropTypes.string`,
    });

    expect(didPropsChange(firstFile, secondFile)).toMatchObject({
      changeDetected: true,
      changeMessage: 'An exported component was added to the file',
    });
  });

  it('should detect change when deleting a file', () => {
    const firstFile = fileWithComponent({
      propTypes: `prop1: PropTypes.number,
       prop2: PropTypes.string`,
    });
    const secondFile = '';

    expect(didPropsChange(firstFile, secondFile)).toMatchObject({
      changeDetected: true,
      changeMessage: 'An exported component was deleted from the file',
    });
  });

  it('should detect change when changing the exported component display name', () => {
    const firstFile = fileWithComponent({ displayName: `'myComp'` });
    const secondFile = fileWithComponent({ displayName: `'myNewComp'` });

    expect(didPropsChange(firstFile, secondFile)).toMatchObject({
      changeDetected: true,
      changeMessage: 'PropTypes were changed in myNewComp component',
    });
  });

  it('should not detect change when providing a file with no components', () => {
    const firstFile = 'const MY_CONST = 5';
    const secondFile = 'const MY_CONST = 6';

    expect(didPropsChange(firstFile, secondFile)).toMatchObject({
      changeDetected: false,
    });
  });

  it('should not detect change for unchanged file', () => {
    expect(
      didPropsChange(fileWithComponent(), fileWithComponent()),
    ).toMatchObject({ changeDetected: false });
  });

  it('should not detect change for default prop values changes', () => {
    const firstFile = fileWithComponent({
      propTypes: 'prop1: PropTypes.number',
      defaultPropValues: `prop1: 0`,
    });
    const secondFile = fileWithComponent({
      propTypes: 'prop1: PropTypes.number',
      defaultPropValues: `prop1: 1`,
    });

    expect(didPropsChange(firstFile, secondFile)).toMatchObject({
      changeDetected: false,
    });
  });

  describe('file with two components', () => {
    it('should detect change for prop changes in first file', () => {
      const firstFile = fileWithTwoComponents({
        firstCompPropTypes: 'prop1: PropTypes.string',
      });
      const secondFile = fileWithTwoComponents({
        firstCompPropTypes: 'prop1: PropTypes.string.isRequired',
      });

      expect(didPropsChange(firstFile, secondFile)).toMatchObject({
        changeDetected: true,
        changeMessage: 'PropTypes were changed in Comp1 component',
      });
    });

    it('should detect change for prop changes in second file', () => {
      const firstFile = fileWithTwoComponents({
        secondCompPropTypes: 'myProp: PropTypes.string',
      });
      const secondFile = fileWithTwoComponents({
        secondCompPropTypes: 'myOtherProp: PropTypes.string',
      });

      expect(didPropsChange(firstFile, secondFile)).toMatchObject({
        changeDetected: true,
        changeMessage: 'PropTypes were changed in Comp2 component',
      });
    });
  });
});
