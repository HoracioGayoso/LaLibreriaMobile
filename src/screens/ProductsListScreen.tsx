import React, { useState } from 'react';
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
import { RootStackParamList } from 'types';
import SearchBar from '../components/basic-components/SearchBar';

// Datos de ejemplo
const PRODUCTS: any[] = [
    {
        id: '1',
        name: 'Caja BIC Azul x50u',
        provider_name: 'El Once',
        price: 1000,
        profitMargin: 70,
        current_stock: 12,
        image: null,
        unit: 'cajas',
    },
    {
        id: '2',
        name: 'Sacapunta Pizarro x100u',
        provider_name: 'El Once',
        price: 500,
        profitMargin: 100,
        current_stock: 1,
        image: null,
        unit: 'cajas',
    },
    {
        id: '3',
        name: 'Caja BIC Azul x50u',
        provider_name: 'El Once',
        price: 1000,
        profitMargin: 70,
        current_stock: 12,
        image: null,
        unit: 'cajas',
    },
    {
        id: '4',
        name: 'Sacapunta Pizarro x100u',
        provider_name: 'El Once',
        price: 500,
        profitMargin: 100,
        current_stock: 1,
        image: null,
        unit: 'cajas',
    },
    {
        id: '5',
        name: 'Caja BIC Azul x50u',
        provider_name: 'El Once',
        price: 1000,
        profitMargin: 70,
        current_stock: 12,
        image: null,
        unit: 'cajas',
    },
    {
        id: '6',
        name: 'Sacapunta Pizarro x100u',
        provider_name: 'El Once',
        price: 500,
        profitMargin: 100,
        current_stock: 1,
        image: null,
        unit: 'cajas',
    }
    // Podés agregar más datos para probar
];

type ProductCardNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const ProductsListScreen: React.FC = () => {

    const navigation = useNavigation<ProductCardNavigationProp>();
    const [searchText, setSearchText] = useState('');

    const renderItem: ListRenderItem<any> = ({ item }) => (
        <View style={styles.itemContainer}>
            <ProductListItem product={item} />
        </View>
    );

    return (
        <Background>
            <View style={styles.card}>
                <Text style={styles.listTitle}>Listado de Productos</Text>

                <SearchBar
                    value={searchText}
                    onChangeText={setSearchText}
                />

                <TouchableOpacity
                    style={[styles.button, styles.filterButton]}
                    onPress={() => true}
                >
                    <Image
                        source={require('../../assets/icons/filter-icon.png')}
                        style={styles.buttonIcon}
                    />
                    <Text style={styles.buttonText}>Filtros</Text>
                </TouchableOpacity>

                {/* Scrollable list container */}
                <View style={styles.scrollContainer}>
                    <FlatList
                        data={PRODUCTS}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={styles.listContainer}
                        showsVerticalScrollIndicator={true}
                    />
                </View>

                {/* Sticky button at the bottom */}
                <TouchableOpacity
                    style={[styles.button, styles.backButton, { marginTop: 5 }]}
                    onPress={() => navigation.goBack()}
                >
                    <Image
                        source={require('../../assets/icons/chevron-left.png')}
                        style={styles.buttonIcon}
                    />
                    <Text style={styles.buttonText}>Volver al inicio</Text>
                </TouchableOpacity>
            </View>
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
        marginBottom: 15,
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
});

export default ProductsListScreen;
