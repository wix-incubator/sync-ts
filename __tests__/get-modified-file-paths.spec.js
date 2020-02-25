import shell from 'shelljs';
import getModifiedFilePaths from '../src/get-modified-files/get-modified-file-paths';
import { mockExec } from '../drivers/mocks/shellJS';

describe('get modified file paths function', () => {
  const mockFile = '/test-file.js';
  let execSpy;

  beforeEach(() => {
    execSpy = jest.spyOn(shell, 'exec');
    execSpy.mockImplementation(mockExec({ mockFile }));
  });

  afterEach(() => {
    execSpy.mockClear();
  });

  it('should get paths for modified files', async () => {
    const filePaths = await getModifiedFilePaths();
    expect(execSpy).toHaveBeenCalled();
    expect(filePaths.length).toBe(1);
    expect(filePaths).toContain(mockFile);
  });
});
