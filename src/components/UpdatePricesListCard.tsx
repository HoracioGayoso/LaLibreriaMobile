import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    FlatList,
    View,
    ListRenderItem,
    Text,
    TouchableOpacity,
    Image,
} from 'react-native';
import UpdatePriceProductItem from '../components/UpdatePriceProductItem';
import Background from '../components/Background';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, UpdatePricesListCardProps } from 'types';
import { getAllProducts } from '../services/server/productService';

type ProductListNavigationProp = StackNavigationProp<RootStackParamList, 'ProductsList'>;

const UpdatePricesListCard: React.FC<UpdatePricesListCardProps> = ({ document, onBack, onUpdate, provider }) => {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const [productsData] = await Promise.all([getAllProducts()]);
                setProducts(productsData);
            } catch (error) {
                console.error('Error al obtener productos:', error);
            } finally {
                setLoading(false); // Marca como terminado
            }
        };

        fetchProducts();
    }, []);
    // Crear un mapa de productos existentes por barcode
    const productsMap = new Map(products.map(product => [product.codigo_barra, product]));

    // Filtrar documentos válidos con precio y barcode existente
    // const initialFilteredProducts: (any & { newPrice: number })[] =
    //     Array.isArray(document)
    //         ? document
    //             .filter((doc: any) => typeof doc.precio === 'number' && productsMap.has(doc.codigo_barra))
    //             .map((doc: any) => {
    //                 const originalProduct = productsMap.get(doc.codigo_barra)!;
    //                 return {
    //                     ...originalProduct,
    //                     nuevoPrecio: doc.precio,
    //                 };
    //             })
    //         : [];
    const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
    useEffect(() => {
        if (
            loading ||                      // Esperar a que termine
            !Array.isArray(document) ||
            products.length === 0 ||
            !provider?.id
        ) return;
        const documentMap = new Map(
            document.map((item: any) => [item.codigo_barra, item.precio])
        );
        console.log(documentMap)
        const filtered = products
            .filter(product =>
                product.proveedor_id === provider.id
            )
            .map(product => ({
                ...product,
                nuevoPrecio: documentMap.get(product.codigo_barra),
            }));
        console.log(filtered)
        setFilteredProducts(filtered);
    }, [document, products, provider?.id, loading]);
    const handleDelete = (productId: string) => {
        setFilteredProducts(current =>
            current.filter(product => product.id !== productId)
        );
    };

    const renderItem: ListRenderItem<any> = ({ item }) => (
        <View style={styles.itemContainer}>
            <UpdatePriceProductItem product={item} newPrice={item.nuevoPrecio} onDelete={() => handleDelete(item.id)} />
        </View>
    );

    return (
        <Background>
            <>
                <View style={styles.card}>
                    <Text style={styles.listTitle}>Listado de Productos</Text>
                    <View style={styles.scrollContainer}>
                        <FlatList
                            data={filteredProducts}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.id}
                            contentContainerStyle={styles.listContainer}
                            showsVerticalScrollIndicator={true}
                        />
                    </View>
                    <TouchableOpacity style={[
                        styles.button,
                        styles.saveButton,
                        filteredProducts.length === 0 && styles.buttonDisabled,
                    ]} onPress={onUpdate} disabled={filteredProducts.length === 0}
                    >
                        <Image source={require('../../assets/icons/save_icon.png')} style={styles.buttonIcon} />
                        <Text style={styles.buttonText}>Guardar los precios actualizados</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.button, styles.backButton, { marginTop: 5 }]}
                        onPress={() => onBack()}
                    >
                        <Image
                            source={require('../../assets/icons/chevron-left.png')}
                            style={styles.buttonIcon}
                        />
                        <Text style={styles.buttonText}>Volver</Text>
                    </TouchableOpacity>
                </View>
            </>
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
        width: '95%',
        minWidth: '95%',
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
    saveButton: {
        marginTop: 10,
        backgroundColor: '#6371B2',
    },
    buttonDisabled: {
        backgroundColor: '#999',
        shadowOpacity: 0,
        elevation: 0,
    },
});

export default UpdatePricesListCard;
