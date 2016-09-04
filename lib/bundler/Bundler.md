# Component Bundler

The component bundler is one of the core artifact managers.
It is responsible for taking an `install.json` file of a component or similar project artifact 
and install all the various dependencies intelligently.

It must handle conflict resolution as well as recursive dependencies from child components etc.

## Usage

Bundle named component(s) 

- `aic bundle <names>`

Look up each of the component names in the components registry. For each match it will consult the `install.json` file in the 
installation folder of that component. If the component is composed of other components it will walk the sub-components as 
well and bundle each one (that has not previously been bundled). 

Sub-component are registered in the `install.json` file like a regular `installer.json`.

```json
{
  "name": "contact",
  "version": "0.1.0",
  "type": "component",
  "targets": [
    "aurelia"
  ],
  "dependencies": {
    
  },
  "prepends": {
    
  },
  "components": {
    "contact-detail": {
      "filePath": "./contact-detail",
      "bundled": false
    },
    "contact-form": {
      "remoteURL": "github:aurelia-components/contact-form#latest",
      "bundled": false
    }
  }
}
```

The `targets` show which install targets this component supports.

Notice that sub-components have their own `bundled` marker. Thus the application only knows the bundle status of top-level components, 
whereas each component manages its own registry of child components. 

If the bundle configuration of a child component is changed, you can force bundle it directly via:
`aic bundle .` which will consult the `install.json` of the current folder and bundle that component and any unbundled child components.

A sub component can either be local via `filePath` or remote via `remoteURL`. When a component bundles its sub-components, those that are 
remote are first installed (by cloning) and then configured/bundled as usual. Each component that is cloned can be updated and managed 
individually by `git pull` and such, to faciliate multiple developers working on separate components!

In the (near) future we will set up an Artefact server where components can be registered much like npm modules, and where the components
can be public or private.

Applications are considered components themselves. Apps can even contain sub-apps that are child components!
The setting `autoBundle` can be configured on the child component level if needed, to override the project level setting from `installer.json`.

Bundling consists of:
- add to and install `package.json` dependencies
- install plugins
- install vendor libs
- install typings

- updating `aurelia.json` config file:
  - add `dependencies` and `prepend` to vendor (and other) bundles
  - add extra typing sources
  - ... 

- mark component entry as bundled

This ensures that once you install and bundle a component, the application will be updated with all the 
relevant dependencies, including css files, typings etc. without you having to manage all this mess yourself each time!

Benefits: Huge reduction of complexity, trial and error and most of all frustration and time!!! 

### loading resources

Currently Aurelia uses two different models for loading external resources.

For webpack, you simply load the resources in your `.js` files such as `import 'bootstrap/dist/bootstrap.css';`. 
These resources will be detected during app bundling and the the appropriate loader will bundled the resources with the app.

If you don't use webpack, you must use the special `<require from="bootstrap/dist/bootstrap.css">` element to indicate which resources are to be bundled.

As we can see, the references are identical, only the method differs. Why must we manage this ourselves?
The component should list the resource locations to be loaded/inclued and when it is installed it should 
generate and insert the relevant `import` or `<require>` depending on the project preferences (ie. using webpack or not).

The `install.json` config file should thus include entries for resources which are to be auto-inserted in `index.js` or `index.html` or wherever `"main"` points to.

```json
"main": "contact",
"resources": [
  "kendo-ui/styles/web/css/kendo.materialblack.min.css"
]
```

Ideally we should register aliases, like: `"css:kendo-ui:materialblack.min.css"` and in a structured format:

```json
"resources": [
  {
    "css": {
      "kendo-ui": [
        "materialblack.min.css"
      ],
      "bootstrap": [
      ]      
    },
    "fonts": {      
    }
  }
]
```

## unbundle component(s)

Unbundle named component(s) 

- `aic unbundle <names>`

Unbundles the component and all child components by consulting `installer.json` components registry and 
each sub-registry components iteratively and unbundling each.

