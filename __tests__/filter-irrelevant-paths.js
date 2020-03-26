import filterIrrelevantPaths from '../src/get-modified-files/filter-irrelevant-paths';

describe('filter irrelevant paths function', () => {
  it('should filter out excluded paths', async () => {
    const paths = [
      'src/AutoCompleteComposite/index.js',
      'src/AutoCompleteComposite/docs/ExampleStandard.js',
      'src/AutoCompleteComposite/Helper/index.js',
    ];
    const excludePaths = ['src/.*/docs/.*'];
    const filePaths = await filterIrrelevantPaths(paths, excludePaths);
    expect(filePaths.length).toBe(2);
    expect(filePaths[0]).toEqual(paths[0]);
    expect(filePaths[1]).toEqual(paths[2]);
  });

  it('should return all paths when nothing match exclude path', async () => {
    const paths = [
      'src/AutoCompleteComposite/index.js',
      'src/AutoCompleteComposite/docs/ExampleStandard.js',
      'src/AutoCompleteComposite/Helper/index.js',
    ];
    const excludePaths = ['src/.*/docs1/.*', 'src/.*/randomPath/.*'];
    const filePaths = await filterIrrelevantPaths(paths, excludePaths);
    expect(filePaths.length).toBe(3);
  });

  it('should return all paths when exclude is undefined', async () => {
    const paths = [
      'src/AutoCompleteComposite/index.js',
      'src/AutoCompleteComposite/Helper/index.js',
    ];
    const filePaths = await filterIrrelevantPaths(paths);
    expect(filePaths.length).toBe(2);
  });
});
