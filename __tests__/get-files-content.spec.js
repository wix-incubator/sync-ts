import fs from 'fs';
import getFilesContent from '../src/get-modified-files/get-files-content';

jest.setTimeout(10000);

describe('get files content function', () => {
  let readFileSpy;
  const mockReadFile = (url, encoding, cb) =>
    setTimeout(() => cb(null, mockFileContent));
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
    const filePaths = await getFilesContent(mockFilePaths);
    const expected = [
      { relativePath: '/test-file.js', content: 'some content' },
    ];

    expect(readFileSpy).toHaveBeenCalled();
    expect(filePaths.length).toBe(1);
    expect(filePaths).toEqual(expected);
  });

  it('should return empty array if no files exist', async () => {
    const filePaths = await getFilesContent();
    const expected = [];

    expect(readFileSpy).not.toHaveBeenCalled();
    expect(filePaths.length).toBe(0);
    expect(filePaths).toEqual(expected);
  });
});
