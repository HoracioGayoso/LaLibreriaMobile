import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import Background from '../components/Background';
import { RouteProp } from '@react-navigation/native';
import ProductCard from '../components/ProductCard';
import EditProductCard from '../components/EditProductCard';

type ProductoScreenRouteProp = RouteProp<RootStackParamList, 'Producto'>;
type ProductoScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Producto'>;

type Props = {
  route: ProductoScreenRouteProp;
  navigation: ProductoScreenNavigationProp;
};

const ProductoScreen: React.FC<Props> = ({ route }) => {
  const { barcode } = route.params;
  const [product, setProduct] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      const fakeDatabase = [
        {
          barcode: barcode,
          name: 'Caja BIC Azul x50u',
          provider_name: 'El Once',
          price: 1000.0,
          profitMargin: 70,
          current_stock: 12,
        },
      ];
  
      const foundProduct = fakeDatabase.find((item) => item.barcode === barcode);
      setProduct(foundProduct || null);
    };
  
    fetchProduct();
  }, [barcode]);

  const handleEditProduct = () => {
    setIsEditing(true);
  };

  const handleSaveProduct = (updatedProduct: any) => {
    setProduct(updatedProduct);
    setIsEditing(false);
  };

  return (
    <Background>
      {product ? (
        isEditing ? (
          <EditProductCard product={product} saveProduct={handleSaveProduct} />
        ) : (
          <ProductCard product={product} editProduct={handleEditProduct} />
        )
      ) : (
        <View style={styles.notFoundContainer}>
          <Text style={styles.notFoundText}>Producto no encontrado para el código: {barcode}</Text>
        </View>
      )}
    </Background>
  );
};

const styles = StyleSheet.create({
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
