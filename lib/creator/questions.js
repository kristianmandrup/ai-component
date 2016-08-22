module.exports = {
  askForAlternativeFolder: function(existingPath) {
    return {
      name: 'folderName',
      message: `Folder ${existingPath} exists. Please specify alternative name or path`,
      validate: function(value) {
        return value !== existingPath;
      }
    }
  }
}