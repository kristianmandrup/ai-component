const {io } = require('ai-core');
const { path } = io;
const defaultLayoutPath = path.join(__dirname, './component')

function layout(ctx, layoutPath = defaultLayoutPath) {
  let files = io.filesIn(layoutPath);
  return ctx.hasView ? _.filter(files, 'index.html') : files;       
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