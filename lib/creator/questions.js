module.exports = [{
  name: 'hasView',
  message: 'Is it a view component?',
  type: 'confirm',
  default: true
}, {
  name: 'hasRouter',
  message: 'Does it have a router?',
  type: 'confirm',
  default: false
}, {
  name: 'description',
  message: 'Description:',
  type: 'input',    
}, {
  name: 'author',
  message: 'Author:',
  type: 'input',    
}, {
  name: 'keywords',
  message: 'Keywords:',
  type: 'input',    
}];
