// src/navigation/AppNavigator.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import BarcodeScannerScreen from '../screens/BarcodeScannerScreen';
import { RootStackParamList } from 'types';
import ProductScreen from './ProductScreen';
import ProductsListScreen from './ProductsListScreen';
import UpdatePricesScreen from './UpdatePricesScreen';
import AlertsScreen from './AlertsScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="BarcodeScanner"
        component={BarcodeScannerScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Product"
        component={ProductScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProductsList"
        component={ProductsListScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UpdatePrices"
        component={UpdatePricesScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Alerts"
        component={AlertsScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
