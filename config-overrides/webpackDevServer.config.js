'use strict';

const path = require('path');

const envPublicUrl = process.env.PUBLIC_URL || '';

function ensureSlash(path, needsEndSlash) {
  const startWithSlash = path.startsWith('/');
  if (startWithSlash) {
    path = path.substr(1, path.length);
  }
  return !path.endsWith('/') && needsEndSlash ? `${path}/` : path;
};

module.exports = function(config) {
  config = {
    ...config,
    ...{
      contentBase: path.resolve('static'),
      publicPath: ensureSlash(envPublicUrl, true),
      proxy: {
        '/static': {
          target: 'http://localhost:[port]/',
          pathRewrite: { '^/static': `/${ensureSlash(envPublicUrl, false)}/static` },
        },
      },
      disableHostCheck: true,
    },
  };
  return config;
};
