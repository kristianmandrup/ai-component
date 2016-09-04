# Test

[mocha](https://mochajs.org/) with [should]() are used as the testing framework.

We need to mock the file system or at least the Registry and other key classes which expect to load 
certain config files at certain locations.

We use [mock-fs](https://github.com/tschaub/mock-fs) to mock files as follows:

```js
mock({
  './': {
    'installer.json': configs.project,
    'src/component/contact': {
      'install.json': configs.components.contact 
    }
  }
});
``` 

