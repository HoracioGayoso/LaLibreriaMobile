import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Importa useNavigation
import { ImageCardProps } from 'types';
import { launchCamera } from 'react-native-image-picker';


type ProductCardNavigationProp = StackNavigationProp<RootStackParamList, 'Producto'>;

const ImageCard: React.FC<ImageCardProps> = ({ productImage, onClose, onUpdateImage }) => {
    const navigation = useNavigation<ProductCardNavigationProp>();
    const [image, setImage] = useState(productImage || '');

    const handleTakePhoto = async () => {
      const result = await launchCamera(
        {
          mediaType: 'photo',
          saveToPhotos: true,
          includeBase64: false,
        },
        (response) => {
          if (response.didCancel) {
            Alert.alert('Acción cancelada', 'No se tomó ninguna imagen.');
          } else if (response.errorCode) {
            Alert.alert('Error', `Error al abrir la cámara: ${response.errorMessage}`);
          } else if (response.assets && response.assets.length > 0) {
            const uri = response.assets[0].uri;
            if (uri) {
              setImage(uri);
            } else {
              Alert.alert('Error', 'No se pudo obtener la URI de la imagen.');
            }
          }          
        }
      );
    };

    const handleClose = () => {
      if (onUpdateImage) {
        onUpdateImage(image);
      }
      onClose();
    };
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image
                  source={image ? { uri: image } : require('../../assets/icons/product-placeholder.png')}
                  style={image ? styles.productImage : styles.placeholderImage}
                  resizeMode="contain"
                />
              </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.button, styles.viewImageButton]} onPress={() => navigation.goBack()}>
                    <Image source={require('../../assets/icons/eye.png')} style={styles.buttonIcon} />
                    <Text style={styles.buttonText}>Ver imagen</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.loadImageButton]} onPress={() => navigation.goBack()}>
                    <Image source={require('../../assets/icons/take-photo.png')} style={styles.buttonIcon} />
                    <Text style={styles.buttonText}>Cargar imagen</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.takeImageButton]} onPress={handleTakePhoto}>
                    <Image source={require('../../assets/icons/image-up.png')} style={styles.buttonIcon} />
                    <Text style={styles.buttonText}>Tomar imagen</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.backButton]} onPress={handleClose}>
                    <Image source={require('../../assets/icons/chevron-left.png')} style={styles.buttonIcon} />
                    <Text style={styles.buttonText}>Volver</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 12,
    alignItems: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 30,
    marginRight: 10,
    borderRadius: 9,
    borderWidth: 3,
    borderColor: '#9C9C9C',
    height: 80,
    width: 80,
    justifyContent: 'center',
  },
  productImage: {
    width: 60,
    height: 60,
  },
  placeholderImage: {
    width: 30,
    height: 30,
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.15, // Reduced opacity
    shadowOffset: { width: 0, height: 2 }, // Reduced shadow offset
    shadowRadius: 5, // Reduced blur radius
    
  },
  viewImageButton: {
    backgroundColor: '#F1C938',
  },
  loadImageButton: {
    backgroundColor: '#CD5352',
  },
  takeImageButton: {
    backgroundColor: '#6371B2',
  },
  backButton: {
    backgroundColor: '#85BFA9',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8,
    fontFamily: 'Inter',
  },
  buttonIcon: {
    width: 16,
    height: 16,
  },
});

export default ImageCard;
