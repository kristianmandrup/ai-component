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

## uninstall component(s)

Install named component at location (or use default location). Install from repo or default repo. 

- `aic uninstall <names>`

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

