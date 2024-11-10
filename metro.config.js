const path = require('path');
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const config = {
  resolver: {
    // Agrega 'svg' a las extensiones soportadas
    sourceExts: ['jsx', 'js', 'ts', 'tsx', 'json', 'svg'],
    // Excluye 'svg' de los archivos que se tratan como assets
    assetExts: getDefaultConfig(__dirname).resolver.assetExts.filter(ext => ext !== 'svg'),
  },
  transformer: {
    // Usa el transformador de SVG
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  },
  watchFolders: [path.resolve(__dirname, 'node_modules')],
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
