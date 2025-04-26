import React from 'react';
import { Modal, View, Image, TouchableOpacity, StyleSheet, Text } from 'react-native';

type Props = {
  visible: boolean;
  imageUri: string;
  onClose: () => void;
};

const FullScreenImage: React.FC<Props> = ({ visible, imageUri, onClose }) => {
    return (
        <Modal visible={visible} transparent={true} animationType="fade">
          <View style={styles.overlay}>
            <View style={styles.topBar}>
              <TouchableOpacity onPress={onClose} style={styles.backButton}>
                <Image
                  source={require('../../assets/icons/chevron-left.png')}
                  style={styles.backIcon}
                />
                <Text style={styles.backText}>Volver</Text>
              </TouchableOpacity>
            </View>
            <Image source={{ uri: imageUri }} style={styles.image} resizeMode="contain" />
          </View>
        </Modal>
      );
    };

    const styles = StyleSheet.create({
        overlay: {
          flex: 1,
          backgroundColor: 'black',
        },
        topBar: {
          height: 40, 
          position: 'absolute',
          top: 15,
          zIndex: 10,
        },
        backButton: {
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 12,
          paddingVertical: 8,
        },
        backIcon: {
          width: 20,
          height: 20,
          tintColor: 'white',
          marginRight: 6,
        },
        backText: {
          color: 'white',
          fontSize: 16,
        },
        image: {
          flex: 1,
          width: '100%',
          marginTop: 30,
        },
      });
  

export default FullScreenImage;
