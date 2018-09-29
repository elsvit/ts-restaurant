/*
 Utility to override react-script-ts without ejecting with files from config-overrides folder
 Config-overrides file should export a single function that takes a config-overrides and modifies it if necessary.
*/

'use strict';

var rewire = require('rewire');
var proxyquire = require('proxyquire');

var configOverridesPath = './config-overrides';
var ENV = process.argv[3];
if (ENV) {
  process.env.PUBLIC_URL = !ENV.startsWith('/') ? `/${ENV}` : ENV;
}

switch(process.argv[2]) {
  case 'start':
    rewireModule('react-scripts-ts/scripts/start.js',
      loadCustomizer(`${configOverridesPath}/webpack.config.dev`),
      loadCustomizer(`${configOverridesPath}/webpackDevServer.config`),
    );
    break;
  case 'build':
    rewireModule('react-scripts-ts/scripts/build.js', loadCustomizer(`${configOverridesPath}/webpack.config.prod`));
    break;
  case 'test':
    let customizer = loadCustomizer(`${configOverridesPath}/jest.config`);
    proxyquire('react-scripts-ts/scripts/test.js', {
      // When test.js asks for '../utils/createJestConfig' it will get this instead:
      './utils/createJestConfig': (...args) => {
        var createJestConfig = require('react-scripts-ts/scripts/utils/createJestConfig');
        return customizer(createJestConfig(...args));
      }
    });
    break;
  default:
    console.log('custom-config-overrides only supports "start", "build", and "test" options.');
    process.exit(-1);
}

function loadCustomizer(module) {
  try {
    return require(module);
  } catch(e) {
    if(e.code !== "MODULE_NOT_FOUND") {
      throw e;
    }
  }

  // If the module doesn't exist return noop.
  return config => config;
}

function rewireModule(modulePath, customizer, devServerCustomizer) {
  // Load the module with `rewire`, which allows modifying the
  // script's internal variables.
  let defaults = rewire(modulePath);

  // Reach into the module, grab its global 'config-overrides' variable,
  // and pass it through the customizer function.
  // The customizer should *mutate* the config-overrides object, because
  // react-scripts-ts imports the config-overrides as a `const` and we can't
  // modify that reference.
  let config = defaults.__get__('config');
  if (devServerCustomizer) {
    let devServerConfig = defaults.__get__('createDevServerConfig');
    devServerCustomizer(devServerConfig);
  }
  customizer(config);
}
