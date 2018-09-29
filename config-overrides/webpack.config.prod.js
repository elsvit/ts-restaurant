/**
 * @fileOverview Webpack config overrides
 */

'use strict';

const autoprefixer = require('autoprefixer');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const envPublicUrl = process.env.PUBLIC_URL || '';

function ensureSlash(path, needsEndSlash) {
  const startWithSlash = path.startsWith('/');
  if (startWithSlash) {
    path = path.substr(1, path.length);
  }
  return !path.endsWith('/') && needsEndSlash ? `${path}/` : path;
}

module.exports = function(config) {
  let loadersList = config.module.rules[1].oneOf;
  loadersList.splice(loadersList.length - 1, 0, {
    test: /\.scss$/,
    loader: ExtractTextPlugin.extract(
      Object.assign(
        {
          fallback: {
            loader: require.resolve('style-loader'),
            options: {hmr: false},
          },
          use: [
            {
              loader: require.resolve('css-loader'),
              options: {
                importLoaders: 1,
                minimize: true,
                sourceMap: true,
              },
            },
            {
              loader: require.resolve('postcss-loader'),
              options: {
                // Necessary for external CSS imports to work
                // https://github.com/facebookincubator/create-react-app/issues/2677
                ident: 'postcss',
                plugins: () => [
                  require('postcss-flexbugs-fixes'),
                  autoprefixer({
                    browsers: [
                      '>1%',
                      'last 4 versions',
                      'Firefox ESR',
                      'not ie < 9', // React doesn't support IE8 anyway
                    ],
                    flexbox: 'no-2009',
                  }),
                ],
              },
            },
            {
              loader: require.resolve('sass-loader'),
              options: {sourceMap: true},
            },
          ],
        },
        {
          publicPath: Array(`${ensureSlash(envPublicUrl, false)}/static/css/[name].[contenthash:8].css`
            .split('/').length)
            .join('../')
            .concat(ensureSlash(envPublicUrl, true)),
        }
      )
    ),
  });
  loadersList.push({test: /\.(config)y$/, loader: `file-loader?name=[name].[ext]`});

  return config;
};
