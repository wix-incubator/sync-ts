export const mockExec = ({ mockFile } = {}) => () => ({
  stdout: {
    on: (eventName, handler) => {
      if (eventName === 'data') {
        handler(mockFile);
      }
    },
  },
});
