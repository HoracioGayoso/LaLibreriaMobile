import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import { Camera } from 'react-native-vision-camera';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import BarcodeScannerCard from '../components/BarcodeScannerCard';
import Background from '../components/Background';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';

type BarcodeScannerScreenNavigationProp = StackNavigationProp<RootStackParamList, 'BarcodeScanner'>;

const BarcodeScannerScreen: React.FC = () => {
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [scannedCode, setScannedCode] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState<boolean>(true);
  const navigation = useNavigation<BarcodeScannerScreenNavigationProp>();

  useFocusEffect(
    useCallback(() => {
      setIsScanning(true);

      return () => {
        setIsScanning(false);
      };
    }, [])
  );
  useEffect(() => {
    const getPermissions = async () => {
      const cameraPermission = await Camera.requestCameraPermission();
      if (cameraPermission === 'granted') {
        setHasPermission(true);
      } else {
        Alert.alert(
          'Permiso denegado',
          'No se pudo acceder a la cámara. Serás redirigido a la pantalla principal.',
          [{ text: 'OK', onPress: () => navigation.navigate('Home') }]
        );
      }
    };

    getPermissions();
  }, [navigation]);

  const handleBarcodeScanned = (barcode: string) => {
    setScannedCode(barcode);
    navigation.navigate('Producto', { barcode });
  };

  if (!hasPermission) {
    return <Text>No camera permission</Text>;
  }

  return (
    <View style={styles.container}>
        <Background>
        <View style={styles.cardContainer}>
            <BarcodeScannerCard onBarcodeScanned={handleBarcodeScanned} isScanning={isScanning}/>
        </View>
        {scannedCode && (
            <View style={styles.infoContainer}>
            <Text style={styles.infoText}>Último código: {scannedCode}</Text>
            </View>
        )}
        </Background>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  background: {
    flex: 1,
    backgroundColor: '#F2F2F2',
  },
  cardContainer: {
    position: 'absolute',
    top: '40%',
    alignSelf: 'center',
    width: '90%',
  },
  infoContainer: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
  infoText: {
    fontSize: 16,
    color: 'black',
  },
});

export default BarcodeScannerScreen;
