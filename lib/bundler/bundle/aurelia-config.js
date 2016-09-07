const { aureliaFile } = require('ai-core');

module.exports = {
  install: function(config) {
    if (!config) return;

    // console.log('configuring aurelia.json vendor bundles', config);
    aureliaFile.addToVendorBundle(config);
  }
}
