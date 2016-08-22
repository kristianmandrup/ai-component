# Creator

## CLI

Create named component at location (or use default location), using basic or custom layout (skeleton). 

- `aic create <name>`
- `aic create <name> [location]`
- `aic create <name> [location] [layout]`

Creates a new component at the location specified (or uses the default component location `src/components`). 
You can specify a layout (skeleton) for the component files to be generated. 

Currently there is a `simple` layout only:

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

