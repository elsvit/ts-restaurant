/**
 * @fileOverview Jest config overrides
 */

'use strict';

module.exports = function(config) {
  return {
    ...config,
    ...{
      globals: {
        'ts-jest': {
          tsConfigFile: './tsconfig.test.json',
        },
      },
      moduleNameMapper: {
        'src/(.*)': '<rootDir>/src/$1',
        'variables/(.*)': '<rootDir>/src/styles/variables/$1',
      },
      transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\](?!lodash-es).+\\.(js|jsx|mjs|ts|tsx)$'],
    },
  };
};
