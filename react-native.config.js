module.exports = {
  project: {
    ios: {},
    android: {
      packageName: 'com.lalibreriamobile', // Reemplaza con tu nombre de paquete
    },
  },
  dependencies: {
    "@react-native-google-signin/google-signin": {
      platforms: {
        android: null, // Deshabilita autolinking para Android
      },
    },
  },
  assets: ['./assets/fonts', './assets/icons'], // Ajusta las rutas según sea necesario
};
