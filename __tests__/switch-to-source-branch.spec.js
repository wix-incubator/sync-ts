import shell from 'shelljs';
import switchToSourceBranch from '../src/get-modified-files/switch-to-source-branch';
import { mockExec } from '../drivers/mocks/shellJS';

describe('switch to source branch function', () => {
  let execSpy;

  beforeEach(() => {
    execSpy = jest.spyOn(shell, 'exec');
  });

  afterEach(() => {
    execSpy.mockClear();
  });

  it('should return true after calling exec and exiting clean', async () => {
    execSpy.mockImplementation(mockExec({ exitCode: 0 }));
    const switchStatus = await switchToSourceBranch();
    expect(execSpy).toHaveBeenCalled();
    expect(switchStatus).toEqual(true);
  });

  it('should return false after calling exec and exiting with an error', async () => {
    execSpy.mockImplementation(mockExec({ exitCode: 1 }));
    const switchStatus = await switchToSourceBranch();
    expect(execSpy).toHaveBeenCalled();
    expect(switchStatus).toEqual(false);
  });
});
