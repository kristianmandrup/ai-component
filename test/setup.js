const chai = require('chai');
global.expect = chai.expect;
chai.should();

chaiCatch = require('chai-catch-exception');
chai.use(chaiCatch);

require('./project-files');

global.mocks = {
  installerConfig: require('./configs/installer')
}
