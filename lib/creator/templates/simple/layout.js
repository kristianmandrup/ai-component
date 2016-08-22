const {io } = require('ai-core');
const { path } = io;
const defaultLayoutPath = path.join(__dirname, './component')

function filter(ctx) {
  let filterFiles = [];
  if (ctx.hasView) filteredFiles.push('index.html');
  if (ctx.hasRouter) filteredFiles.push('section.js');
  return filterFiles;
}

function layout(ctx, layoutPath = defaultLayoutPath) {
  let files = io.filesIn(layoutPath);
  let filterFiles = filter(ctx);
  return _.reject(files, (file) => { _.find(filterFiles, file) } );        
}

function rename(fileName, ctx) {
  let templateExt = path.extname(fileName);
  let ext = path.extname(fileName) === 'js' ? ctx.ext : templateExt;
  let name = path.basename.replace(/^_/, '.');
  name = name.replace(/^-/, '');  
  return [path.basename, ext].join('.');
}

module.exports = {
  layout: layout,
  rename: rename
} 