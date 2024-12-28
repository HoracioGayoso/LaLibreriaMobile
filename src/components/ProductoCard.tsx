import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { ProductCardProps } from 'types';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { useNavigation } from '@react-navigation/native';

type ProductoCardNavigationProp = StackNavigationProp<RootStackParamList, 'Producto'>;

const ProductoCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigation = useNavigation<ProductoCardNavigationProp>();

  return (
    <View style={styles.card}>
      {/* Imagen del producto */}
      <View style={styles.header}>
  {/* Imagen del producto */}
  <View style={styles.imageContainer}>
    <Image
      source={require('../../assets/icons/product-placeholder.png')} // Cambia a la imagen del producto real
      style={styles.productImage}
      resizeMode="contain"
    />
  </View>

  {/* Título */}
  <View style={styles.titleContainer}>
    <Text style={styles.productLabel}>Producto:</Text>
    <Text style={styles.barcode}>#{product.barcode}</Text>
  </View>
</View>

      {/* Información del producto */}
        <View style={styles.infoContainer}>
            <View style={styles.infoRow}>
            <Text style={styles.label}>Nombre: </Text>
            <Text style={styles.data}>{product.name}</Text>
            </View>
            <View style={styles.infoRow}>
            <Text style={styles.label}>Proveedor: </Text>
            <Text style={styles.data}>{product.provider_name}</Text>
            </View>
            <View style={styles.infoRow}>
            <Text style={styles.label}>Precio Mayorista: </Text>
            <Text style={styles.data}>${product.prize?.toFixed(2)}</Text>
            </View>
            <View style={styles.infoRow}>
            <Text style={styles.label}>Margen de ganancia: </Text>
            <Text style={styles.data}>{product.profitMargin}%</Text>
            </View>
            <View style={styles.infoRow}>
            <Text style={styles.label}>Stock actual: </Text>
            <Text style={styles.data}>{product.current_stock}u</Text>
            </View>
        </View>

        {/* Botones */}
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, styles.editButton]}>
            <Image source={require('../../assets/icons/pencil-line.png')} style={styles.buttonIcon} />
            <Text style={styles.buttonText}>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity
            style={[styles.button, styles.backButton]}
            onPress={() => navigation.goBack()}
            >
            <Image source={require('../../assets/icons/chevron-left.png')} style={styles.buttonIcon} />
            <Text style={styles.buttonText}>Volver</Text>
            </TouchableOpacity>
        </View>
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
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      marginBottom: 16,
    },
    imageContainer: {
      alignItems: 'center',
      marginVertical: 16,
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
    titleContainer: {
      justifyContent: 'center',
    },
    productLabel: {
      fontSize: 24,
      color: '#333',
      fontFamily: 'Inter',
    },
    barcode: {
      fontSize: 20,
      color: '#666',
      fontWeight: 'bold',
      fontFamily: 'Inter',
    },
    infoContainer: {
      marginBottom: 20,
    },
    infoRow: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      marginBottom: 8,
    },
    label: {
      fontSize: 16,
      color: '#333',
      fontFamily: 'Inter',
    },
    data: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#333',
      fontFamily: 'Inter',
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
    editButton: {
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

export default ProductoCard;
