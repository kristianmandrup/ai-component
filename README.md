# Ai-component [![Build Status](https://secure.travis-ci.org/kristianmandrup/ai-component.png?branch=master)](http://travis-ci.org/kristianmandrup/ai-component) [![NPM version](https://badge-me.herokuapp.com/api/npm/ai-component.png)](http://badges.enytc.com/for/npm/ai-component)

> Aurelia component management 

## Getting Started

Install the module with: `npm install ai-component`

```javascript
const component = require('ai-component');
```

## Documentation

- `create` component
- `install` component and dependencies
- `uninstall` component and dependencies 
- `bundle` component dependencies with app
- `unbundle` component dependencies from app

## CLI

### create component

Create named component at location (or use default location), using basic or custom layout (skeleton). 

- `aic create <name>`
- `aic create <name> [location]`
- `aic create <name> [location] [layout]`

## install component(s)

Install named component at location (or use default location). Install from repo or default repo. 

- `aic install <names>`
- `aic install <repo>/<name>`
- `aic install <repo>/<name> [location]`

The install command will use the `Downloader` to clone (download) the component 
from a remote git repo. You can either specify the full repo URL or use a git protocol shorthand. 
Currently `github`, `gitlab` and `bitbucket` protocol shorthands are supported.

- `aic install https://bitbucket.org/my-account/my-component.git`
- `aic install bitbucket:my-account/my-component` (using protocol shorthand)

You can also set up preferences in your `installer.json` file to set defaults for 
protocol shorthand and remote git account. This will allow the simpler forms:

- `aic install my-account/my-component` (use default protocol shorthand)
- `aic install my-component` (use default git account)

The installer will first check if a component of that name is already registered in your component registry for the project (`components` section of `installer.json`). 
If such a registry entry exists, it will currently abort installation.

The installer will by default install into your preconfigured destination path for components (also set in `installer.json`) 
or `src/components` if not set. The destination folder will be the name of the git repo.
By default, `aic install my-account/my-component` will be cloned into `src/components/my-component`.
If a folder of that name already exists, it will currently abort registration (in the future it will ask to overwrite and allow you to 
set `autoOverride` setting or even name the registration entry yourself).

If all goes well, it will then proceed to bundle the component if `autoBundle` is set to true. 

## uninstall component(s)

Install named component at location (or use default location). Install from repo or default repo. 

- `aic uninstall <names>`

Will look up each of the names in the components registry (in `installer.json`). For each one found, it will remove the 
component folder pointed to and then unbundle the component as well if `autoBundle` is set to true.

## bundle component(s)

Bundle named component(s) 

- `aic bundle <names>`

## unbundle component(s)

Unbundle named component(s) 

- `aic unbundle <names>`

## Contributing

Please submit all issues and pull requests to the [kristianmandrup/ai-component](https://github.com/kristianmandrup/ai-component) repository!

## Support
If you have any problem or suggestion please open an issue [here](https://github.com/kristianmandrup/ai-component/issues).

## License 

The MIT License

Copyright (c) 2016, Kristian Mandrup

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

