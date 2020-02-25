const startsWithSrc = path => path.startsWith('src/');

const validFileExtension = path =>
  // !path.match('regex for .spec.js, .unit.js, .driver.js, .scss, .css');
  !path.match('[.spec.js,.unit.js,.driver.js,.scss,.css,.md]$');

const hasNoTypescriptDescriptor = allFilePaths => path => {
  const typescriptDescriptorPath = getTypescriptDescriptorPath(path);
  return !allFilePaths.includes(typescriptDescriptorPath);
};

const getTypescriptDescriptorPath = fileRelativePath => {
  const lastSlashIndex = fileRelativePath.lastIndexOf(`/`);
  const fileFolderPath = fileRelativePath.substring(0, lastSlashIndex + 1);
  return `${fileFolderPath}index.d.ts`;
};

const filterIrrelevantPaths = filePaths => {
  return filePaths
    .filter(startsWithSrc)
    .filter(validFileExtension)
    .filter(hasNoTypescriptDescriptor(filePaths));
};

module.exports = filterIrrelevantPaths;
