const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Support for path aliases
config.resolver.extraNodeModules = {
  '@': `${__dirname}/src`,
  '@components': `${__dirname}/src/components`,
  '@hooks': `${__dirname}/src/hooks`,
  '@lib': `${__dirname}/src/lib`,
  '@store': `${__dirname}/src/store`,
  '@types': `${__dirname}/src/types`,
  '@constants': `${__dirname}/src/constants`,
  '@utils': `${__dirname}/src/utils`,
};

// Required for uuid
config.resolver.sourceExts = [...config.resolver.sourceExts, 'cjs'];

module.exports = config;
