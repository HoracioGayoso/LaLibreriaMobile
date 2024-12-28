import React, { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Camera, CodeScanner, getCameraDevice, useCameraDevices, useCodeScanner } from 'react-native-vision-camera';
import { BarcodeScannerCardProps } from 'types';
const BarcodeScannerCard: React.FC<BarcodeScannerCardProps> = ({ isScanning, onBarcodeScanned }) => {
  const devices = useCameraDevices();
  const device = getCameraDevice(devices, 'back');


  const codeScanner: CodeScanner = useCodeScanner({
    codeTypes: ['ean-13', 'ean-8', 'code-39', 'code-128', 'codabar', 'upc-a', 'upc-e', 'itf'],
    onCodeScanned: (codes) => {
      if (codes.length > 0 && isScanning) {
        const scannedCode = codes[0].value;
        if (scannedCode) {
          onBarcodeScanned(scannedCode);
        }
      }
    },
  });
  if (!device) {
    return (
      <View style={styles.loader}>
        <Text>Cargando cámara...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        codeScanner={isScanning ? codeScanner : undefined}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
  },
  loader: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
  },
});

export default BarcodeScannerCard;
