const mockFs = require('mock-fs');

import shell from 'shelljs';
import getFilesContent from '../src/get-modified-files/get-files-content';
import { mockExec } from '../drivers/mocks/shellJS';

describe.skip('get files content function', () => {
  const mockFilePath = '/test-file.js';
  const mockFileContent = 'some content';
  let execSpy;

  beforeEach(() => {
    mockFs({
      mockFilePath: mockFileContent,
    });
    execSpy = jest.spyOn(shell, 'exec');
    execSpy.mockImplementation(mockExec({ mockData: './' }));
  });

  afterEach(() => {
    mockFs.restore();
    execSpy.mockClear();
  });

  it('should get paths for modified files', async () => {
    const expected = [{ relativePath: mockFilePath, content: mockFileContent }];
    const filesContent = await getFilesContent([mockFilePath]);
    expect(filesContent).toEqual(expected);
  });

  it('should return empty array if no files exist', async () => {
    const expected = [];
    const filesContent = await getFilesContent();
    expect(filesContent).toEqual(expected);
  });
});
