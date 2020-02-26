export const mockExec = ({ mockFile, exitCode = 0 } = {}) => () => ({
  stdout: {
    on: (eventName, handler) => {
      if (eventName === 'data') {
        handler(mockFile);
      }
    },
  },
  on: (eventName, handler) => {
    if (eventName === 'exit') {
      handler(exitCode);
    }
  },
});
