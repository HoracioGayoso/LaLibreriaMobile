import React, { useEffect, useMemo, useState } from 'react';
import {
    StyleSheet,
    FlatList,
    View,
    SafeAreaView,
    ListRenderItem,
    Text,
    TouchableOpacity,
    Image,
    TextInput
} from 'react-native';
import ProductListItem from '../components/ProductListItem';
import Background from '../components/Background';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, Filter, Mode } from 'types';
import SearchBar from '../components/basic-components/SearchBar';
import ProductListFilter from '../components/ProductListFilter';
import FilterTag from '../components/basic-components/filterTag';
import { getAllProducts, updateProduct } from '../services/server/productService';
import { getAllCategories } from '../services/server/categoryService';
import { getAllProveedores } from '../services/server/proveedorService';
import ProductCard from '../components/ProductCard';
import ViewProductCard from '../components/ViewProductCard';

type ProductListNavigationProp = StackNavigationProp<RootStackParamList, 'ProductsList'>;

const ProductsListScreen: React.FC = () => {

    const navigation = useNavigation<ProductListNavigationProp>();
    const [searchText, setSearchText] = useState('');
    const [filter, setFilter] = useState(false);
    const [filters, setFilters] = useState<Filter>({});
    const [products, setProducts] = useState<any[]>([]);
    const [providers, setProviders] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
    const [mode, setMode] = useState<Mode>('none');
    const [viewProduct, setViewProduct] = useState<any>(null);
    const renderItem: ListRenderItem<any> = ({ item }) => (
        <View style={styles.itemContainer}>
            <TouchableOpacity onPress={() => { setViewProduct(item) }}>
                <ProductListItem product={item} />
            </TouchableOpacity>
        </View>
    );
    useEffect(() => {
        if (viewProduct) {
            setMode('view');
        }

    }, [viewProduct]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const [productsData, providersData, categoriesData] = await Promise.all([
                    getAllProducts(),
                    getAllProveedores(),
                    getAllCategories()
                ]);
                setProducts(productsData);
                setProviders(providersData);
                setCategories(categoriesData);
                console.log(productsData[0]);
            } catch (error) {
                console.error('Error al obtener productos:', error);
            }
        };

        fetchProducts();
    }, []);
    useEffect(() => {
        const result = products.filter((product) => {
            const filterMatch = Object.entries(filters).every(([key, value]) =>
                product[key]?.toLowerCase().includes(value.toLowerCase())
            );
            const searchMatch =
                product.nombre.toLowerCase().includes(searchText.toLowerCase()) ||
                product.codigo_barra.toLowerCase().includes(searchText.toLowerCase());
            return filterMatch && searchMatch;
        });
        setFilteredProducts(result);
    }, [filters, searchText, products]);

    const productsWithProvidersAndCategories = useMemo(() => {
        if (!categories.length || !providers.length) return [];

        return filteredProducts.map(product => {
            const proveedor = providers.find(p => p.id === product.proveedor_id);
            const category = categories.find(c => c.id === product.categoria_id);
            return {
                ...product,
                proveedor_name: proveedor?.nombre || null,
                categoria_name: category?.nombre || null,
            };
        });
    }, [filteredProducts, providers, categories]);

    const removeFilter = (keyToRemove: string) => {
        const newFilters = { ...filters };
        delete newFilters[keyToRemove];
        setFilters(newFilters);
    };
    const handleSaveProduct = async (updatedProduct: any) => {
        try {
            const result = await updateProduct(updatedProduct.codigo_barra, updatedProduct);

            // Actualizar la lista de productos
            const updatedProducts = products.map(p =>
                p.codigo_barra === updatedProduct.codigo_barra ? updatedProduct : p
            );
            setProducts(updatedProducts);

            // Obtener proveedor y categoría
            const proveedor = providers.find(p => p.id === updatedProduct.proveedor_id);
            const categoria = categories.find(c => c.id === updatedProduct.categoria_id);

            // Enriquecer el producto actualizado
            const enrichedProduct = {
                ...updatedProduct,
                proveedor_name: proveedor?.nombre || null,
                categoria_name: categoria?.nombre || null,
            };

            // Setear como producto en vista
            setViewProduct(enrichedProduct);
            setMode('view');
        } catch (error) {
            console.error('Error al guardar el producto:', error);
        }
    };


    return (
        <Background>
            {!filter && mode === 'none' ?
                <>
                    <View style={styles.card}>
                        <Text style={styles.listTitle}>Listado de Productos</Text>

                        <SearchBar
                            value={searchText}
                            onChangeText={setSearchText}
                        />

                        <TouchableOpacity
                            style={[styles.button, styles.filterButton]}
                            onPress={() => setFilter(!filter)}
                        >
                            <Image
                                source={require('../../assets/icons/filter-icon.png')}
                                style={styles.buttonIcon}
                            />
                            <Text style={styles.buttonText}>Filtros</Text>
                        </TouchableOpacity>
                        <View style={styles.filterTagsContainer}>
                            {Object.entries(filters).map(([key, value]) => {
                                let displayValue = value;
                                if (key === 'proveedor_id') {
                                    const provider = providers.find(p => p.id === value);
                                    if (provider) displayValue = provider.nombre;
                                } else if (key === 'categoria_id') {
                                    const category = categories.find(c => c.id === value);
                                    if (category) displayValue = category.nombre;
                                }
                                return (
                                    <FilterTag
                                        key={key}
                                        value={displayValue}
                                        onDelete={() => removeFilter(key)}
                                    />
                                );
                            })}
                        </View>
                        <View style={styles.scrollContainer}>
                            <FlatList
                                data={productsWithProvidersAndCategories}
                                renderItem={renderItem}
                                keyExtractor={(item) => item.id}
                                contentContainerStyle={styles.listContainer}
                                showsVerticalScrollIndicator={true}
                            />
                        </View>

                        <TouchableOpacity
                            style={[styles.button, styles.backButton, { marginTop: 5 }]}
                            onPress={() => navigation.goBack()}
                        >
                            <Image
                                source={require('../../assets/icons/chevron-left.png')}
                                style={styles.buttonIcon}
                            />
                            <Text style={styles.buttonText}>Volver</Text>
                        </TouchableOpacity>

                    </View>
                </>
                : mode === 'none' ?
                    <ProductListFilter onApply={(newFilters) => {
                        setFilters(newFilters);
                        setFilter(!filter);
                    }} onClose={() => setFilter(false)} /> : null
            }
            {mode === 'view' && (
                <ViewProductCard product={viewProduct} onBack={() => setMode('none')} onEdit={() => setMode('edit')}></ViewProductCard>
            )}
            {mode === 'edit' && (
                <ProductCard barcode={viewProduct.codigo_barra}
                    product={viewProduct}
                    onBack={() => setMode('view')}
                    saveProduct={handleSaveProduct}>
                </ProductCard>
            )}
        </Background>
    );


};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    listContainer: {
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    itemContainer: {
        marginBottom: 20,
    },
    listTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: "#000",
        textAlign: 'center',
        marginTop: 5,
        marginBottom: 15
    },
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
        height: '85%'
    },
    scrollContainer: {
        flex: 1,
        marginBottom: 5,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginBottom: 5,
        elevation: 10,
        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
    },
    backButton: {
        backgroundColor: '#85BFA9',
    },
    filterButton: {
        marginTop: 15,
        backgroundColor: '#6371B2',
    },
    buttonText: {
        color: 'white',
        fontWeight: '400',
        fontSize: 16,
        marginLeft: 8,
        fontFamily: 'Inter',
    },
    buttonIcon: {
        width: 16,
        height: 16,
    },
    filterTagsContainer: {
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 6,
        marginVertical: 10,
    },

});

export default ProductsListScreen;
