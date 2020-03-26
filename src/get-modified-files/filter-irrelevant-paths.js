const irrelevantFileExtensionRegex = /(\.unit\.js|\.spec\.js|\.driver\.js|\.scss|\.css|\.md)$/g;

const startsWithSrc = path => path.startsWith('src/');

const validFileExtension = path => !irrelevantFileExtensionRegex.test(path);

const hasNoTypescriptDescriptor = allFilePaths => path => {
  const typescriptDescriptorPath = getTypescriptDescriptorPath(path);
  return !allFilePaths.includes(typescriptDescriptorPath);
};

const getTypescriptDescriptorPath = fileRelativePath => {
  const lastSlashIndex = fileRelativePath.lastIndexOf(`/`);
  const fileFolderPath = fileRelativePath.substring(0, lastSlashIndex + 1);
  return `${fileFolderPath}index.d.ts`;
};

const notInExcludePaths = (excludePaths = []) => path => {
  if (excludePaths.length === 0) {
    return true;
  }
  const pathIsExcluded = excludePaths.some(excludePath => {
    const pattern = new RegExp(excludePath);
    return pattern.test(path);
  });
  return !pathIsExcluded;
};

const filterIrrelevantPaths = (filePaths, excludePaths) => {
  return filePaths
    .filter(startsWithSrc)
    .filter(validFileExtension)
    .filter(hasNoTypescriptDescriptor(filePaths))
    .filter(notInExcludePaths(excludePaths));
};

module.exports = filterIrrelevantPaths;
