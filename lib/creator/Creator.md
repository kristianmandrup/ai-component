# Creator

## CLI

Create named component at location (or use default location), using basic or custom layout (skeleton). 

- `aic create <name>`
- `aic create <name> [location]`
- `aic create <name> [location] [layout]`

Creates a new component at the location specified (or uses the default component location `src/components`). 
You can specify a layout (skeleton) for the component files to be generated. 

Currently only a `simple` layout is included:

```
/contact
  index.html - optional main View
  index.js - main View Model
  section.js - optional child router
  install.json - config file
  package.json - meta data and lib dependencies
  Readme.md - description
```  

The `index.html` and `section.js` are optional.

You can however now create your own custom component templating:

### Custom component templating

Define and export environment variable AI_HOME to point to a path: 

`export AI_HOME="/Users/<user name>/ai"`

```
/ai
  /component
    /templates
```

Under `/templates` create a folder with the name of your layout, such as `my-custom` and add:
- `/component` folder with files/templates for component
- `template.js` which manages template generation
- `questions.js` which controls which questions are asked (data to be collected) before generation

All files under `/component` will be treates as EJS templates. All will have access to  
the data collected from `qustions.js`

```
  ...
    /templates
      /my-custom
        /component
        template.js
        questions.js
```

Note, that each `.js` file will execute in a "sandbox" and only have the following available:
`{_: _}` where `_` is [lodash](lodash.com) + node `path`.

Sample `template.js`

```js
// skip index.html if hasView is not chosen from questions
// skip section.js if hasRouter is not chosen from questions
function filter(ctx) {
  let filteredFiles = [];
  if (ctx.hasView) filteredFiles.push('index.html');
  if (ctx.hasRouter) filteredFiles.push('section.js');
  return filteredFiles;
}

// filter template paths using filter function (above)
function paths(ctx, files) {
  let filterFiles = filter(ctx);
  return _.reject(files, (file) => { 
    return filterFiles.indexOf(file) >= 0;
  });
}

// rename any .js files to the preferred extension available in ctx
// replace any first '_' character to '.', needed for .gitignore file f.ex 
function rename(fileName, ctx) {
  let templateExt = _.path.extname(fileName);
  let ext = _.path.extname(fileName) === 'js' ? ctx.ext : templateExt;
  let name = _.path.basename(fileName, templateExt).replace(/^_/, '.');
  return [name, ext].join('');
}

module.exports = {
  paths: paths,
  rename: rename
} 
```

The `questions.js` should export an array with questions to collect data to pass to each template.

Sample `questions.js`

```js
module.exports = [{
  name: 'hasView',
  message: 'Is it a view component?',
  type: 'confirm',
  default: true
}, {
  ...
}];
```

This way you can create component generators for using 
your preferred ORM, Form and UI layout frameworks!! 
Then share with the community or within your team/organisation :)

## Architecture

The Creator creates a component based on a skeleton layout and user choices.
The `templator` is in charge of finding the skeleton layout files to be used and to 
generate the templates for the component. The `template` class of the `ai-core` module is used
for generating the component files via template and data (context). 
`context-maker` is responsible for setting up the full context to be passed to each template.
`paths` generates paths necessary, such as the base layout/skeleton path and the component destination path.

### Skeleton layouts

The skeleton layouts are found under `creator/templates`. Currently only a `simple` layout is defined.
In the end, the user should have the option to define and choose to use his own layouts.
Custom component skeleton layouts should be stored and managed under `$AI_HOME/component/creator/templates`. 
A skeleton layout can include custom:
- `questions` 
- `layout` filter function
- `rename` function for files to be generated 

### Arguments

The creator optionally takes the following arguments:
- `name` the name of the component to create 
- an options object with `layout` and `mountPath` 

The `layout` specifies which set of templates to use to create the components skeleton structure.
By default the `simple` layout will be used. The mountPath is an optional target destination for the component.
By default the component will be created as per the project setting for the default `componentPath`, 
which is `$APP_SRC/component` (where `$APP_SRC` typically is the `/src` folder of the project or the src root 
location of the current app being worked on) 

