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

type ProductListNavigationProp = StackNavigationProp<RootStackParamList, 'ProductsList'>;

const UpdatePricesListCard: React.FC<UpdatePricesListCardProps> = ({ document, onBack, onUpdate }) => {
    const PRODUCTS: any[] = [
        {
            id: '1',
            name: 'Caja BIC Azul x50u 1',
            provider_name: 'El Once',
            price: 1000,
            profitMargin: 70,
            current_stock: 12,
            image: null,
            unit: 'cajas',
            category: 'Papelería',
            barcode: 'barcode1'
        },
        {
            id: '2',
            name: 'Sacapunta Pizarro x100u 2',
            provider_name: 'El Once',
            price: 500,
            profitMargin: 100,
            current_stock: 1,
            image: null,
            unit: 'cajas',
            category: 'Escritura',
            barcode: 'barcode2'
        },
        {
            id: '3',
            name: 'Caja BIC Azul x50u 3',
            provider_name: 'El Once',
            price: 1000,
            profitMargin: 70,
            current_stock: 12,
            image: null,
            unit: 'cajas',
            category: 'Papelería',
            barcode: 'barcode3'
        },
        {
            id: '4',
            name: 'Sacapunta Pizarro x100u 4',
            provider_name: 'El Once',
            price: 500,
            profitMargin: 100,
            current_stock: 1,
            image: null,
            unit: 'cajas',
            category: 'Escritura',
            barcode: 'barcode4'
        },
        {
            id: '5',
            name: 'Caja BIC Azul x50u 5',
            provider_name: 'El Once',
            price: 1000,
            profitMargin: 70,
            current_stock: 12,
            image: null,
            unit: 'cajas',
            category: 'Papelería',
            barcode: 'barcode5'
        },
        {
            id: '6',
            name: 'Sacapunta Pizarro x100u 6',
            provider_name: 'El Once',
            price: 500,
            profitMargin: 100,
            current_stock: 1,
            image: null,
            unit: 'cajas',
            category: 'Escritura',
            barcode: 'barcode6'
        },
        {
            id: '7',
            name: 'Sacapunta Pizarro x100u 7',
            provider_name: 'El Doce',
            price: 500,
            profitMargin: 100,
            current_stock: 1,
            image: null,
            unit: 'cajas',
            category: 'Escritura',
            barcode: 'barcode7'
        },
    ];

    // Crear un mapa de productos existentes por barcode
    const productsMap = new Map(PRODUCTS.map(product => [product.barcode, product]));

    // Filtrar documentos válidos con precio y barcode existente
    const initialFilteredProducts: (any & { newPrice: number })[] =
        Array.isArray(document)
            ? document
                .filter((doc: any) => typeof doc.newPrice === 'number' && productsMap.has(doc.barcode))
                .map((doc: any) => {
                    const originalProduct = productsMap.get(doc.barcode)!;
                    return {
                        ...originalProduct,
                        newPrice: doc.newPrice,
                    };
                })
            : [];
    const [filteredProducts, setFilteredProducts] = useState(initialFilteredProducts);
    useEffect(() => {
        // Si document cambia, actualizar la lista filtrada
        setFilteredProducts(initialFilteredProducts);
    }, [document]);
    const handleDelete = (productId: string) => {
        setFilteredProducts(current =>
            current.filter(product => product.id !== productId)
        );
    };

    const renderItem: ListRenderItem<any> = ({ item }) => (
        <View style={styles.itemContainer}>
            <UpdatePriceProductItem product={item} newPrice={item.newPrice} onDelete={() => handleDelete(item.id)} />
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
