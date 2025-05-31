import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import Background from '../components/Background';
import { RouteProp } from '@react-navigation/native';
import ProductCard from '../components/ProductCard';
import ProductNotFoundCard from '../components/ProductNotFoundCard';
import { Mode } from '../types';
type ProductoScreenRouteProp = RouteProp<RootStackParamList, 'Product'>;
type ProductoScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Product'>;

type Props = {
  route: ProductoScreenRouteProp;
  navigation: ProductoScreenNavigationProp;
};

const ProductoScreen: React.FC<Props> = ({ route }) => {
  const { barcode } = route.params;
  const [product, setProduct] = useState<any>(null);
  const [mode, setMode] = useState<Mode>('none');

  useEffect(() => {
    const fetchProduct = async () => {
      const localImage = require('../../assets/icons/product-placeholder.png');
      const resolved = Image.resolveAssetSource(localImage);
      const fakeDatabase = [
        {
          barcode: 'barcode',
          name: 'Caja BIC Azul x50u',
          provider_name: 'El Once',
          price: 1000.0,
          profitMargin: 70,
          current_stock: 12,
          image: resolved.uri,
          unit: 'Cajas',
          //category_name: 'Categoria 2'
        },
      ];

      const foundProduct = fakeDatabase.find((item) => item.barcode === barcode);
      console.log(foundProduct);
      if (foundProduct) {
        setProduct(foundProduct);
        setMode('edit');
      } else {
        setProduct(undefined);
        setMode('none')
      }

    };

    fetchProduct();
  }, [barcode]);

  const handleCreateProduct = (newProduct: any) => {
    console.log(newProduct, "aca pa");
    if (newProduct) {
      setMode('create');
    }
  }

  const handleSaveProduct = (updatedProduct: any) => {
    setProduct(updatedProduct);
    setMode('none');
  };

  return (
    <Background>
      {mode === 'edit' ? (
        <ProductCard
          product={product}
          saveProduct={handleSaveProduct}
          barcode={barcode}
        />
      ) : mode === 'create' ? (
        <ProductCard
          saveProduct={handleSaveProduct}
          barcode={barcode}
        />
      ) : (
        <ProductNotFoundCard onCreate={handleCreateProduct} />
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
