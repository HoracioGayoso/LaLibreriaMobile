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
import Background from '../components/Background';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, Filter } from 'types';
import FilterTag from '../components/basic-components/filterTag';
import AlertsFilter from '../components/AlertsFilter';
import AlertItem from '../components/AlertItem';
import { getAllProducts } from '../services/server/productService';

type ProductListNavigationProp = StackNavigationProp<RootStackParamList, 'ProductsList'>;

const AlertsScreen: React.FC = () => {

    const navigation = useNavigation<ProductListNavigationProp>();
    const [filter, setFilter] = useState(false);
    const [filters, setFilters] = useState<Filter>({});
    const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
    const [products, setProducts] = useState<any[]>([]);

    const renderItem: ListRenderItem<any> = ({ item }) => (
        <View style={styles.itemContainer}>
            <AlertItem product={item} />
        </View>
    );
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const [productsData] = await Promise.all([
                    getAllProducts(),
                ]);
                setProducts(productsData);
            } catch (error) {
                console.error('Error al obtener productos:', error);
            }
        };
        fetchProducts();
    }, []);
    useEffect(() => {
        const result = products
            .filter((product) => product.stock <= product.min_stock)
            .filter((product) => {
                if (!filters.alertType) return true;

                const isAmarilla = filters.alertType === 'Amarilla' && product.stock > 0;
                const isRoja = filters.alertType === 'Roja' && product.stock === 0;

                return isAmarilla || isRoja;
            });
        setFilteredProducts(result);
    }, [filters, products]);

    const removeFilter = (keyToRemove: string) => {
        const newFilters = { ...filters };
        delete newFilters[keyToRemove];
        setFilters(newFilters);
    };


    return (
        <Background>
            {!filter ?
                <>
                    <View style={styles.card}>
                        <Text style={styles.listTitle}>Alertas</Text>

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
                            {Object.entries(filters).map(([key, value]) => (
                                <FilterTag
                                    key={key}
                                    value={`${value}`}
                                    onDelete={() => removeFilter(key)}
                                />
                            ))}
                        </View>
                        <View style={styles.scrollContainer}>
                            <FlatList
                                data={filteredProducts}
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
                            <Text style={styles.buttonText}>Volver al inicio</Text>
                        </TouchableOpacity>

                    </View>
                </>
                :
                <AlertsFilter onApply={(newFilters) => {
                    setFilters(newFilters);
                    setFilter(!filter);
                }} onClose={() => setFilter(false)} />
            }
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

export default AlertsScreen;
