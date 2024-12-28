import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import Background from '../components/Background';
import { RouteProp } from '@react-navigation/native';
import  ProductoCard from '../components/ProductoCard'
type ProductoScreenRouteProp = RouteProp<RootStackParamList, 'Producto'>;
type ProductoScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Producto'>;

type Props = {
  route: ProductoScreenRouteProp;
  navigation: ProductoScreenNavigationProp;
};
const ProductoScreen: React.FC<Props> = ({ route }) => {
  const { barcode } = route.params; // Obtener el código de barras desde los parámetros
  const [product, setProduct] = useState<any>(null);
  useEffect(() => {
    // Aquí puedes reemplazarlo con una llamada a la API o consulta a una base de datos
    const fetchProduct = async () => {
      const fakeDatabase = [
        {
          barcode: barcode,
          name: 'Caja BIC Azul x50u',
          provider_name: 'El Once',
          prize: 1000.0,
          profitMargin: 70,
          current_stock: 12,
          image: 'https://example.com/image.jpg',
        },
        // Agregar más productos si es necesario
      ];
  
      const foundProduct = fakeDatabase.find((item) => item.barcode === barcode);
      setProduct(foundProduct || null);
    };
  
    fetchProduct();
  }, [barcode]);
  return (
    <Background>
      {product ? (
        <ProductoCard product={product} />
      ) : (
        <View style={styles.notFoundContainer}>
          <Text style={styles.notFoundText}>Producto no encontrado para el código: {barcode}</Text>
        </View>
      )}
    </Background>
  );
};

const styles = StyleSheet.create({
  loadingText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#333',
  },
  notFoundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notFoundText: {
    fontSize: 18,
    color: 'red',
  },
});

export default ProductoScreen;
