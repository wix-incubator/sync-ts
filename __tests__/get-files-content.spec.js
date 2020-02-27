const mockFs = require('mock-fs');

import getFilesContent from '../src/get-modified-files/get-files-content';

describe('get files content function', () => {
  const mockFilePath = '/test-file.js';
  const mockFileContent = 'some content';

  beforeEach(() => {
    mockFs({
      mockFilePath: mockFileContent,
    });
  });

  afterEach(() => {
    mockFs.restore();
  });

  it('should get paths for modified files', async () => {
    const expected = [{ relativePath: mockFilePath, content: mockFileContent }];

    await expect(getFilesContent([mockFilePath])).resolves.toEqual(expected);
  });

  it('should return empty array if no files exist', async () => {
    const expected = [];

    await expect(getFilesContent()).resolves.toEqual(expected);
  });
});
