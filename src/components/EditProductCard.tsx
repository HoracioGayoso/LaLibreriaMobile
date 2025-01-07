import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
  Modal, // Importa Modal
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { EditProductCardProps } from 'types';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { useNavigation } from '@react-navigation/native';
import { formatPrice, unformatPrice, formatMargin, unformatMargin } from '../utils';
import ImageCard from './ImageCard';
type ProductCardNavigationProp = StackNavigationProp<RootStackParamList, 'Producto'>;

const EditProductCard: React.FC<EditProductCardProps> = ({ product, saveProduct }) => {
  const navigation = useNavigation<ProductCardNavigationProp>();
  const [name, setName] = useState(product?.name || '');
  const [barcode, setBarcode] = useState(product?.barcode || '');
  const [provider, setProvider] = useState(product?.provider_name || '');
  const [price, setPrice] = useState(product?.price && !isNaN(product.price) ? formatPrice(product.price) : "");
  const [margin, setMargin] = useState(product?.profitMargin && !isNaN(product.profitMargin) ? formatMargin(product.profitMargin.toString()) : '');
  const [stock, setStock] = useState(product?.current_stock || '');
  const [unit, setUnit] = useState(product?.unit || '');
  const [image, setImage] = useState(product?.image || null);
  const [showImageModal, setShowImageModal] = useState(false);
  const saveChanges = () => {
    const updatedProduct = { 
      ...product, 
      name, 
      barcode, 
      provider, 
      price: unformatPrice(price),
      profitMargin: unformatMargin(margin),
      current_stock: stock, 
      unit 
    };
    saveProduct(updatedProduct);
  };

  const handleChangePrice = (value: string) => {
    setPrice(unformatPrice(value));
  };

  const handleBlurPrice = () => {
    if (price === '' || isNaN(price)) {
      setPrice('');
    } else {
      setPrice(formatPrice(price));
    }
  };

  const handleChangeMargin = (value: string) => {
    setMargin(unformatMargin(value));
  };

  const handleBlurMargin = () => {
    if (margin === '' || isNaN(margin)) {
      setMargin('');
    } else {
      setMargin(formatMargin(margin));
    }
  };
  const handleImageUpdate = (image: string) => {
    setImage(image);
  };
  const handleOpenImageModal = () => setShowImageModal(true);
  const handleCloseImageModal = () => {
    console.log('click close image modal');
    setShowImageModal(false);
  };
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Producto #{product?.barcode}</Text>

      <View style={styles.horizontalContainer}>
        <TouchableOpacity style={styles.imageContainer} onPress={handleOpenImageModal}>
        <Image
          source={
            image? { uri: image }
              : require('../../assets/icons/product-placeholder.png')
          }
          style={image ? styles.productImage : styles.placeholderImage}
          resizeMode="contain"
        />
        </TouchableOpacity>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nombre</Text>
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            value={name}
            onChangeText={setName}
          />
        </View>
      </View>

      {/* Proveedor */}
      <Text style={styles.label}>Proveedor</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={provider}
          onValueChange={(itemValue) => setProvider(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="El Once" value="El Once" />
          <Picker.Item label="Otro Proveedor" value="Otro Proveedor" />
        </Picker>
      </View>

      {/* Precio Mayorista */}
      <Text style={styles.label}>Precio Mayorista</Text>
      <TextInput
        style={styles.input}
        placeholder="Precio Mayorista"
        value={price}
        keyboardType="numeric"
        onChangeText={handleChangePrice}
        onBlur={handleBlurPrice}
      />

      {/* Margen de ganancia */}
      <Text style={styles.label}>Margen de ganancia</Text>
      <TextInput
        style={styles.input}
        placeholder="Margen de ganancia"
        value={margin}
        keyboardType="numeric"
        onChangeText={handleChangeMargin}
        onBlur={handleBlurMargin}
      />

      {/* Contenedor para Stock y Unidades */}
      <View style={styles.rowContainer}>
        {/* Columna de Stock */}
        <View style={styles.stockContainer}>
          <Text style={styles.label}>Stock</Text>
          <TextInput
            style={styles.input}
            placeholder="Stock"
            value={stock.toString()}
            keyboardType="numeric"
            onChangeText={setStock}
          />
        </View>

        {/* Columna de Unidad */}
        <View style={styles.unitContainer}>
          <Text style={styles.label}>Unidad</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={unit}
              onValueChange={(itemValue) => setUnit(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Cajas" value="Cajas" />
              <Picker.Item label="Unidades" value="Unidades" />
            </Picker>
          </View>
        </View>
      </View>

      <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={saveChanges}>
        <Image source={require('../../assets/icons/save_icon.png')} style={styles.buttonIcon} />
        <Text style={styles.buttonText}>Guardar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.backButton]}
        onPress={() => navigation.goBack()}
      >
        <Image source={require('../../assets/icons/chevron-left.png')} style={styles.buttonIcon} />
        <Text style={styles.buttonText}>Volver</Text>
      </TouchableOpacity>

      {/* Modal para ImageCard */}
      <Modal
        visible={showImageModal}
        transparent={true}
        animationType="slide"
        onRequestClose={handleCloseImageModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ImageCard productImage={image} onClose={handleCloseImageModal} onUpdateImage={handleImageUpdate}/>
          </View>
        </View>
      </Modal>
    </View>
  );
};


const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    width: '90%',
    alignSelf: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
    color: '#000',
    fontFamily: 'Inter',
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 5,
    marginRight: 5,
    borderRadius: 9,
    borderWidth: 3,
    borderColor: '#9C9C9C',
    height: 80,
    width: 80,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  productImage: {
    width: 60,
    height: 60,
  },
  placeholderImage: {
    width: 30,
    height: 30,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 2,
    marginLeft: 10,
    marginTop: 5,
    fontFamily: 'Inter',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 12,
    paddingVertical: 10,
    color: '#000',
    paddingHorizontal: 25,
    fontFamily: 'Inter',
  },
  horizontalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  inputContainer:{
    flex:1,
  },
  pickerContainer: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 12,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  picker: {
    height: 50,
    color: '#000',
    fontFamily: 'Inter',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  stockContainer: {
    flex: 1,
    marginRight: 5,
  },
  unitContainer: {
    flex: 3,
    marginLeft: 5,
  },
  buttonIcon: {
    width: 16,
    height: 16,
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
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
  saveButton: {
    marginTop: 10,
    backgroundColor: '#6371B2',
  },
  backButton: {
    backgroundColor: '#85BFA9',
  },
  buttonText: {
    color: 'white',
    fontWeight: '400',
    fontSize: 16,
    marginLeft: 8,
    fontFamily: 'Inter',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
  },
});

export default EditProductCard;