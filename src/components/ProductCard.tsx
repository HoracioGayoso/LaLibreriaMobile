import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
  Modal, // Importa Modal
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { ProductCardProps } from 'types';
import { formatPrice, unformatPrice, formatMargin, unformatMargin } from '../utils';
import ImageCard from './ImageCard';
import { getAllProveedores } from '../services/server/proveedorService';
import { getAllCategories } from '../services/server/categoryService';

const ProductCard: React.FC<ProductCardProps> = ({ saveProduct, barcode, product, onBack }) => {
  const [finalProduct, setFinalProduct] = useState(product ? product : {
    nombre: '',
    codigo_barra: barcode,
    precio_unidad: '',
    porcentaje_ganancia: '',
    stock: '',
    imagen: null,
    proveedor_id: '',
    categoria_id: '',
  });
  const [name, setName] = useState(finalProduct?.nombre || '');
  const [provider, setProvider] = useState<any>(null);
  const [category, setCategory] = useState<any>(null);
  const [price, setPrice] = useState(finalProduct?.precio_unidad && !isNaN(finalProduct.precio_unidad) ? formatPrice(finalProduct.precio_unidad) : "");
  const [margin, setMargin] = useState(finalProduct?.porcentaje_ganancia && !isNaN(finalProduct.porcentaje_ganancia) ? formatMargin(finalProduct.porcentaje_ganancia.toString()) : '');
  const [stock, setStock] = useState(finalProduct?.stock || '');
  const [image, setImage] = useState(finalProduct?.imagen || null);
  const [showImageModal, setShowImageModal] = useState(false);
  const [providers, setProviders] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const [providersData, categoriesData] = await Promise.all([
          getAllProveedores(),
          getAllCategories()
        ]);
        setProviders(providersData);
        setCategories(categoriesData);
        if (finalProduct?.proveedor_id) {
          const foundProvider = providersData.find((p: { id: any; }) => p.id === finalProduct.proveedor_id);
          setProvider(foundProvider || '');
        }

        if (finalProduct?.categoria_id) {
          const foundCategory = categoriesData.find((c: { id: any; }) => c.id === finalProduct.categoria_id);
          setCategory(foundCategory || '');
        }
      } catch (error) {
        console.error('Error al obtener productos:', error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (finalProduct) {
      setName(finalProduct.nombre || '');
      setPrice(finalProduct.precio_unidad && !isNaN(finalProduct.precio_unidad) ? formatPrice(finalProduct.precio_unidad) : '');
      setMargin(finalProduct.porcentaje_ganancia && !isNaN(Number(finalProduct.porcentaje_ganancia)) ? formatMargin(finalProduct.porcentaje_ganancia.toString()) : '');
      setStock(finalProduct.stock ?? '');
      setImage(finalProduct.imagen || null);
      if (finalProduct.proveedor_id && providers.length) {
        const foundProvider = providers.find((p: { id: string }) => p.id === finalProduct.proveedor_id);
        setProvider(foundProvider || '');
      }

      if (finalProduct.categoria_id && categories.length) {
        const foundCategory = categories.find((c: { id: string }) => c.id === finalProduct.categoria_id);
        setCategory(foundCategory || '');
      }
    }
  }, [finalProduct, providers, categories]);

  const saveChanges = () => {
    const { categoria_name = null, proveedor_name = null, ...rest } = finalProduct;

    const updatedProduct = {
      ...rest,
      nombre: name,
      codigo_barra: barcode,
      precio_unidad: unformatPrice(price),
      porcentaje_ganancia: unformatMargin(margin),
      stock: Number(stock),
      imagen: image,
      categoria_id: category.id,
      proveedor_id: provider.id
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
    setShowImageModal(false);
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Producto #{barcode}</Text>

      <View style={styles.horizontalContainer}>
        <TouchableOpacity style={styles.imageContainer} onPress={handleOpenImageModal}>
          <Image
            source={
              image ? { uri: image }
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

      {/* Categoria */}
      <Text style={styles.label}>Categoria</Text>
      <View style={styles.pickerContainer}>
        <Dropdown
          data={categories}
          labelField="nombre"
          valueField="id"
          value={category?.id}
          placeholder="Selecciona una categoria"
          onChange={item => setCategory(item)}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          style={styles.dropdown}
          renderItem={(item, selected) => {
            const index = categories.findIndex(c => c === item);
            const isLast = index === categories.length - 1;
            return (
              <View style={[styles.dropdownItem, isLast && styles.noBorder]}>
                <Text style={styles.itemTextStyle}>{item.nombre}</Text>
              </View>
            );
          }}
        />
      </View>
      {/* Proveedor */}
      <Text style={styles.label}>Proveedor</Text>
      <View style={styles.pickerContainer}>
        <Dropdown
          data={providers}
          labelField="nombre"
          valueField="id"
          value={provider?.id}
          placeholder="Selecciona un proveedor"
          onChange={item => setProvider(item)}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          style={styles.dropdown}
          renderItem={(item, selected) => {
            const index = providers.findIndex(p => p === item);
            const isLast = index === providers.length - 1;
            return (
              <View style={[styles.dropdownItem, isLast && styles.noBorder]}>
                <Text style={styles.itemTextStyle}>{item.nombre}</Text>
              </View>
            );
          }}
        />
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

      {/* Contenedor para Stock */}
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
      </View>

      <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={saveChanges}>
        <Image source={require('../../assets/icons/save_icon.png')} style={styles.buttonIcon} />
        <Text style={styles.buttonText}>Guardar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.backButton]}
        onPress={() => onBack()}
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
            <ImageCard productImage={image} onClose={handleCloseImageModal} onUpdateImage={handleImageUpdate} />
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
  inputContainer: {
    flex: 1,
  },
  pickerContainer: {
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 12,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  dropdown: {
    height: 50,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#999',
    fontFamily: 'Inter',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#000',
    fontFamily: 'Inter',
  },
  itemTextStyle: {
    fontSize: 16,
    color: '#000',
    fontFamily: 'Inter',
    borderRadius: 12,
    borderColor: "#ccc"
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#fff',
    borderStyle: 'dashed',
  },
  noBorder: {
    borderBottomWidth: 0,
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

export default ProductCard;