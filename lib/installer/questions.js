const resolveConflict = {
  name: 'resolution',
  message: 'component folder exists, how do wish to resolve?',
  type: 'list',
  choices: ['overwrite', 'rename', 'abort'],
  default: 'abort' 
}

const nameFolder = {
  name: 'folderName',
  message: 'Name of component folder?',
}

const nameEntry = {
  name: 'entryName',
  message: 'Name of component entry?',
}

module.exports = {
  resolveConflict: resolveConflict,
  nameFolder: nameFolder,
  nameEntry: nameEntry
}