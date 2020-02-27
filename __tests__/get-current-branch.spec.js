import shell from 'shelljs';
import getCurrentBranch from '../src/get-modified-files/get-current-branch';
import { mockExec } from '../drivers/mocks/shellJS';

describe('get git root path function', () => {
  const mockData = 'branch';
  let execSpy;

  beforeEach(() => {
    execSpy = jest.spyOn(shell, 'exec');
    execSpy.mockImplementation(mockExec({ mockData }));
  });

  afterEach(() => {
    execSpy.mockClear();
  });

  it('should return git root path', async () => {
    const currentBranch = await getCurrentBranch();
    expect(execSpy).toHaveBeenCalled();
    expect(currentBranch).toContain(mockData);
  });
});
