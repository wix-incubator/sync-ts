import resolveFiles from '../src/get-modified-files/resolve-files';

describe('resolve files function', () => {
  it('should return an empty object for no files', async () => {
    expect(resolveFiles()).toEqual({});
    expect(resolveFiles([])).toEqual({});
    expect(resolveFiles(null)).toEqual({});
    expect(resolveFiles(null, null)).toEqual({});
  });

  it('should return a valid object for provided files', async () => {
    const prFiles = [
      { relativePath: '/file.js', content: 'some content' },
      { relativePath: '/new-file.js', content: 'new content' },
      { relativePath: '/deleted-file.js', content: '' },
    ];
    const sourceBranchFiles = [
      { relativePath: '/file.js', content: 'some other content' },
      { relativePath: '/new-file.js', content: '' },
      { relativePath: '/deleted-file.js', content: 'deleted content' },
    ];
    const expected = {
      '/file.js': {
        contentFromTargetBranch: 'some content',
        contentFromSourceBranch: 'some other content',
      },
      '/new-file.js': {
        contentFromTargetBranch: 'new content',
        contentFromSourceBranch: '',
      },
      '/deleted-file.js': {
        contentFromTargetBranch: '',
        contentFromSourceBranch: 'deleted content',
      },
    };
    expect(resolveFiles(prFiles, sourceBranchFiles)).toEqual(expected);
  });
});
