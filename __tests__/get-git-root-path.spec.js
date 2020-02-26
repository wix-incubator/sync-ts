import shell from 'shelljs';
import getModifiedFilePaths from '../src/get-modified-files/get-modified-file-paths';
import { mockExec } from '../drivers/mocks/shellJS';

describe('get git root path function', () => {
  const mockData = '/git-root-path';
  let execSpy;

  beforeEach(() => {
    execSpy = jest.spyOn(shell, 'exec');
    execSpy.mockImplementation(mockExec({ mockData }));
  });

  afterEach(() => {
    execSpy.mockClear();
  });

  it('should return git root path', async () => {
    const filePaths = await getModifiedFilePaths();
    expect(execSpy).toHaveBeenCalled();
    expect(filePaths.length).toBe(1);
    expect(filePaths).toContain(mockData);
  });
});
