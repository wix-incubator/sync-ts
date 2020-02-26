export const mockExec = ({ mockData, exitCode = 0 } = {}) => () => ({
  stdout: {
    on: (eventName, handler) => {
      if (eventName === 'data') {
        handler(mockData);
      }
    },
  },
  on: (eventName, handler) => {
    if (eventName === 'exit') {
      handler(exitCode);
    }
  },
});
