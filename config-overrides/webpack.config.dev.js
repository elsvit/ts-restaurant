/**
 * @fileOverview Webpack config overrides
 */

'use strict';

const autoprefixer = require('autoprefixer');
const path = require('path');

module.exports = function(config) {
  let loadersList = config.module.rules[1].oneOf;
  loadersList.splice(loadersList.length - 1, 0, {
    test: /\.scss$/,
    use: [
      require.resolve('style-loader'),
      {
        loader: require.resolve('css-loader'),
        options: {
          importLoaders: 1,
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
  });
  loadersList.splice(loadersList.length - 1, 0, {
    loader: require.resolve('file-loader'),
    exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/],
    options: {
      name: 'static/media/[name].[hash:8].[ext]',
    },
  });

  return config;
};
