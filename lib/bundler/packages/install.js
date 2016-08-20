module.exports = class Install {
  constructor(config) {
    this.config = config;
  }

  mergePackageDependencies() {
    console.log('configuring npm dependencies');
    let sourcePath = path.join(this.filePath, 'package.json');
    const mutator = createMutator({key: 'dependencies'});
    mutateJsonFile('./package.json', sourcePath, mutator);
  }
}

function createMutator(options) {
  // TODO: use ai-core merger!
  return function mutator(targetConfig, sourceConfig) {
    if (options.key) {
      let source = {}
      source[options.key] = sourceConfig[options.key]
      sourceConfig = source;
    }

    return sort(_.merge({}, targetConfig, sourceConfig));
  }
}