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

// Datos de ejemplo
const ALERTS: any[] = [
    {
        id: '1',
        name: 'Caja BIC Azul x50u 1',
        provider_name: 'El Once',
        price: 1000,
        profitMargin: 70,
        current_stock: 12,
        min_stock: 15,
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
        current_stock: 0,
        min_stock: 15,
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
        min_stock: 10,
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
        current_stock: 3,
        min_stock: 15,
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
        current_stock: 0,
        min_stock: 15,
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
        min_stock: 1,
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
        current_stock: 15,
        min_stock: 15,
        image: null,
        unit: 'cajas',
        category: 'Escritura',
        barcode: 'barcode7'
    },
];


type ProductListNavigationProp = StackNavigationProp<RootStackParamList, 'ProductsList'>;

const AlertsScreen: React.FC = () => {

    const navigation = useNavigation<ProductListNavigationProp>();
    const [filter, setFilter] = useState(false);
    const [filters, setFilters] = useState<Filter>({});
    const [filteredAlerts, setFilteredAlerts] = useState(ALERTS);


    const renderItem: ListRenderItem<any> = ({ item }) => (
        <View style={styles.itemContainer}>
            <AlertItem product={item} />
        </View>
    );

    useEffect(() => {
        const result = ALERTS
            .filter((alert) => alert.current_stock <= alert.min_stock)
            .filter((alert) => {
                if (!filters.alertType) return true;

                const isAmarilla = filters.alertType === 'Amarilla' && alert.current_stock > 0;
                const isRoja = filters.alertType === 'Roja' && alert.current_stock === 0;

                return isAmarilla || isRoja;
            });

        setFilteredAlerts(result);
    }, [filters]);

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
                                data={filteredAlerts}
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
