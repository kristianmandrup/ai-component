const { utils } = require('ai-core');
const { io, _ } = utils;
const { path, filesIn } = io;
const defaultLayoutPath = path.join(__dirname, './component')

function filter(ctx) {
  let filteredFiles = [];
  if (ctx.hasView) filteredFiles.push('index.html');
  if (ctx.hasRouter) filteredFiles.push('section.js');
  return filteredFiles;
}

function paths(ctx, layoutPath = defaultLayoutPath) {
  let files = filesIn(layoutPath);
  let filterFiles = filter(ctx);
  let res = _.reject(files, (file) => { 
    return filterFiles.indexOf(file) >= 0;
  });
  return res;        
}

function rename(fileName, ctx) {
  let templateExt = path.extname(fileName);
  let ext = path.extname(fileName) === 'js' ? ctx.ext : templateExt;
  let name = path.basename(fileName, templateExt).replace(/^_/, '.');
  let res = [name, ext].join('');  
  return res;
}

module.exports = {
  paths: paths,
  rename: rename
} 