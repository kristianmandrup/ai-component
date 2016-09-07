# Test Bundler

Currently the vendor lib registry has the following:
- bootstrap
- foundation
- aurelia-datatable
- aurelia-pages

NOT jquery

In case I have an `install.json` like:

```json
  "bundles": [
    "bootstrap",
    "jquery"
  ]
```

Where `bootstrap` has a registration entry, but `jquery` not - simply ignore jquery (optionally log a warning?).

## Vendor Libs registry

```json
{
  "bootstrap": {
    "dependencies": [
      "jquery",
      {
        "name": "bootstrap",
        "path": "../node_modules/bootstrap/dist",
        "main": "js/bootstrap.min",
        "deps": ["jquery"],
        "exports": "$",
        "resources": [
          "css/bootstrap.css"
        ]
      }
    ]    
  },
  "foundation": { 
    "dependencies": [
      "jquery",
      "what-input",
      {
        "name": "foundation-sites",
        "path": "../node_modules/foundation-sites/dist",
        "main": "foundation.min",
        "deps": ["jquery", "what-input"],
        "exports": "$",
        "resources": [
          "foundation.min.css"
        ]
      }
    ]    
  },
  "aurelia-datatable": {
    "dependencies": [
      {
        "name": "homefront",
        "path": "../node_modules/homefront/dist",
        "main": "index"
      },
      {
        "name": "aurelia-datatable",
        "path": "../node_modules/aurelia-datatable/dist/amd",
        "main": "aurelia-datatable",
        "resources": [
          "bootstrap/datatable.html"
        ]
      }
    ]    
  },
  "aurelia-pager": {
    "dependencies": [
      {
        "name": "aurelia-pager",
        "path": "../node_modules/aurelia-pager/dist/amd",
        "main": "aurelia-pager",
        "resources": [
          "bootstrap/pager.html"
        ]
      }
    ]    
  }
}
``` 