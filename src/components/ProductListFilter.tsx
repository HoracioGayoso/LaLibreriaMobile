import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList, FilterProps } from 'types';
import { StackNavigationProp } from '@react-navigation/stack';
import { Dropdown } from 'react-native-element-dropdown';
import { getAllCategories } from '../services/server/categoryService';
import { getAllProveedores } from '../services/server/proveedorService';
const ProductListFilter: React.FC<FilterProps> = ({
    onApply,
    onClose
}) => {
    const [providers, setProviders] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedProvider, setSelectedProvider] = useState<any>(null);
    const [selectedCategory, setSelectedCategory] = useState<any>(null);
    const applyFilters = () => {
        const filters: Record<string, string> = {};
        if (selectedProvider) filters.proveedor_id = selectedProvider.id;
        if (selectedCategory) filters.categoria_id = selectedCategory.id;
        onApply(filters);
    };
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getAllCategories();
                setCategories(data);
            } catch (error) {
                console.error('Error al obtener categorias:', error);
            }
        };

        fetchCategories();
        const fetchProviders = async () => {
            try {
                const data = await getAllProveedores();
                setProviders(data);
            } catch (error) {
                console.error('Error al obtener proveedores:', error);
            }
        };

        fetchProviders();
    }, []);

    return (
        <View style={styles.cardContainer}>
            <View>
                <Text style={styles.label}>Proveedor</Text>
                <View style={styles.pickerContainer}>
                    <Dropdown
                        data={providers}
                        labelField="nombre"
                        valueField="id"
                        value={selectedProvider?.id ?? null}   // asigna el id del seleccionado o null
                        placeholder="Selecciona un proveedor"
                        onChange={item => setSelectedProvider(item)}
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

                <Text style={styles.label}>Categoría</Text>
                <View style={styles.pickerContainer}>
                    <Dropdown
                        data={categories}
                        labelField="nombre"
                        valueField="id"
                        value={selectedCategory?.id ?? null}
                        onChange={item => setSelectedCategory(item)}
                        placeholder="Selecciona una categoría"
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
            </View>

            <View>
                <TouchableOpacity
                    style={[styles.button, styles.applyButton]}
                    onPress={() => applyFilters()}>
                    <Image
                        source={require('../../assets/icons/check.png')}
                        style={styles.buttonIcon}
                    />
                    <Text style={styles.buttonText}>Aplicar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, styles.backButton]}
                    onPress={() => onClose()}>
                    <Image
                        source={require('../../assets/icons/chevron-left.png')}
                        style={styles.buttonIcon}
                    />
                    <Text style={styles.buttonText}>Volver</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
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
        height: '80%',
        justifyContent: 'space-between',
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
    pickerContainer: {
        borderWidth: 2,
        borderColor: '#ccc',
        borderRadius: 12,
        backgroundColor: '#fff',
        overflow: 'hidden',
        marginBottom: 10,
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
    buttonIcon: {
        width: 16,
        height: 16,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginBottom: 10,
        elevation: 10,
        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
    },
    applyButton: {
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
    }
});

export default ProductListFilter;
