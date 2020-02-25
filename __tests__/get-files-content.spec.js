import fs from 'fs';
import getFilesContent from '../src/get-modified-files/get-files-content';

describe('get files content function', () => {
  let readFileSpy;
  const mockReadFile = (url, encoding, cb) => cb(null, mockFileContent);
  const mockFilePaths = ['/test-file.js'];
  const mockFileContent = 'some content';

  beforeEach(() => {
    readFileSpy = jest.spyOn(fs, 'readFile');
    readFileSpy.mockImplementation(mockReadFile);
  });

  afterEach(() => {
    readFileSpy.mockClear();
  });

  it('should get paths for modified files', async () => {
    const expected = [
      { relativePath: '/test-file.js', content: 'some content' },
    ];

    await expect(getFilesContent(mockFilePaths)).resolves.toEqual(expected);
    expect(readFileSpy).toHaveBeenCalled();
  });

  it('should return empty array if no files exist', async () => {
    const expected = [];

    await expect(getFilesContent()).resolves.toEqual(expected);
    expect(readFileSpy).not.toHaveBeenCalled();
  });
});
