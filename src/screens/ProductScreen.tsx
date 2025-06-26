import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import Background from '../components/Background';
import { RouteProp } from '@react-navigation/native';
import ProductCard from '../components/ProductCard';
import ProductNotFoundCard from '../components/ProductNotFoundCard';
import { Mode } from '../types';
import ViewProductCard from '../components/ViewProductCard';
import { createProduct, getAllProducts, updateProduct } from '../services/server/productService';
import { getAllProveedores } from '../services/server/proveedorService';
import { getAllCategories } from '../services/server/categoryService';
type ProductoScreenRouteProp = RouteProp<RootStackParamList, 'Product'>;
type ProductoScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Product'>;

type Props = {
  route: ProductoScreenRouteProp;
  navigation: ProductoScreenNavigationProp;
};

const ProductoScreen: React.FC<Props> = ({ route, navigation }) => {
  const { barcode } = route.params;
  const [product, setProduct] = useState<any>(null);
  const [mode, setMode] = useState<Mode>('none');
  const [products, setProducts] = useState<any[]>([]);
  const [providers, setProviders] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [category, setCategory] = useState<any>(null);
  const [provider, setProvider] = useState<any>(null);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const [productsData, providersData, categoriesData] = await Promise.all([
          getAllProducts(),
          getAllProveedores(),
          getAllCategories()
        ]);
        setProviders(providersData);
        setCategories(categoriesData);
        const enrichedProducts = productsData.map((product: any) => {
          const proveedor = providersData.find((p: { id: any; }) => p.id === product.proveedor_id);
          const category = categoriesData.find((c: { id: any; }) => c.id === product.categoria_id);
          return {
            ...product,
            proveedor_name: proveedor?.nombre || null,
            categoria_name: category?.nombre || null,
          };
        })
        setProducts(enrichedProducts)
        const foundProduct = enrichedProducts.find((p: { codigo_barra: string; }) => p.codigo_barra === barcode);
        if (foundProduct) {
          setProduct(foundProduct);
          setMode('view');

          const foundProvider = providersData.find((p: { id: any; }) => p.id === foundProduct.proveedor_id);
          setProvider(foundProvider || '');

          const foundCategory = categoriesData.find((c: { id: any; }) => c.id === foundProduct.categoria_id);
          setCategory(foundCategory || '');
        } else {
          setProduct(undefined);
          setMode('none');
        }
      } catch (error) {
        console.error('Error al obtener productos:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleCreateProduct = (newProduct: any) => {
    if (newProduct) {
      setMode('create');
    }
  }

  const handleSaveProduct = async (updatedProduct: any) => {
    try {
      const result = await createProduct(updatedProduct);
      setProducts(prev => [...prev, result]);
      const proveedor = providers.find(p => p.id === updatedProduct.proveedor_id);
      const categoria = categories.find(c => c.id === updatedProduct.categoria_id);
      const enrichedProduct = {
        ...updatedProduct,
        proveedor_name: proveedor?.nombre || null,
        categoria_name: categoria?.nombre || null,
      };
      setProduct(enrichedProduct);
      setMode('view');
    } catch (error) {
      console.error('Error al guardar el producto:', error);
    }

  };
  const handleUpdateProduct = async (updatedProduct: any) => {
    try {
      const result = await updateProduct(updatedProduct.codigo_barra, updatedProduct);
      const updatedProducts = products.map(p =>
        p.codigo_barra === updatedProduct.codigo_barra ? updatedProduct : p
      );
      setProducts(updatedProducts);
      const proveedor = providers.find(p => p.id === updatedProduct.proveedor_id);
      setProvider(proveedor);
      const categoria = categories.find(c => c.id === updatedProduct.categoria_id);
      setCategory(categoria);

      const enrichedProduct = {
        ...updatedProduct,
        proveedor_name: proveedor?.nombre || null,
        categoria_name: categoria?.nombre || null,
      };
      setProduct(enrichedProduct);
      setMode('view');
    } catch (error) {
      console.error('Error al guardar el producto:', error);
    }
  };
  return (
    <Background>
      {mode === 'edit' ? (
        <ProductCard
          product={product}
          saveProduct={handleUpdateProduct}
          barcode={barcode}
          onBack={() => setMode('view')}
        />
      ) : mode === 'create' ? (
        <ProductCard
          saveProduct={handleSaveProduct}
          barcode={barcode}
          onBack={() => setMode('none')}
        />
      ) : mode === 'view' ? (
        <ViewProductCard product={product} onBack={() => navigation.navigate('Home')} onEdit={() => setMode('edit')} />
      )
        : (
          <ProductNotFoundCard onCreate={handleCreateProduct} />
        )
      }
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
