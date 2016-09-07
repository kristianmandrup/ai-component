module.exports = function projectDeps() {
  let mockedPack = global.mockedFiles['./package.json']
  return JSON.parse(mockedPack).dependencies;
}
