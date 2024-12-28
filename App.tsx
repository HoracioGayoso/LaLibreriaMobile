// App.tsx
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import AppNavigator from './src/screens/MainNavigator'; // Importa el navegador
import { Provider } from 'react-redux';
import store from './src/store'; // Importa el store

function App(): React.JSX.Element {
  return (
    <PaperProvider>
      <Provider store={store}>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </Provider>
    </PaperProvider>
  );
}

export default App;
