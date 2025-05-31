import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ProductNotFoundCardProps } from 'types';
import { RootStackParamList } from 'types';
import { StackNavigationProp } from '@react-navigation/stack';

type ProductCardNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Product'
>;

const ProductNotFoundCard: React.FC<ProductNotFoundCardProps> = ({
  onCreate
}) => {
  const navigation = useNavigation<ProductCardNavigationProp>();

  const createProduct = () => {
    let newProduct = {
      barcode: '',
      name: '',
      provider_name: '',
      price: 0,
      profitMargin: 0,
      current_stock: 0,
      image: null,
      unit: '',
      category_name: undefined
    };
    onCreate(newProduct);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Producto no encontrado</Text>
      <TouchableOpacity
        style={[styles.button, styles.saveButton]}
        onPress={createProduct}>
        <Image
          source={require('../../assets/icons/plus-square.png')}
          style={styles.buttonIcon}
        />
        <Text style={styles.buttonText}>Crear</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.backButton]}
        onPress={() => navigation.goBack()}>
        <Image
          source={require('../../assets/icons/chevron-left.png')}
          style={styles.buttonIcon}
        />
        <Text style={styles.buttonText}>Volver</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
    color: '#000',
    fontFamily: 'Inter',
    paddingVertical: 20,
  },
});

export default ProductNotFoundCard;
