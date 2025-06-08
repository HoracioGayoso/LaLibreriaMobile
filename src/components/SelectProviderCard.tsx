import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Image
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { SelectProviderProps } from 'types';

const NewProviderCard: React.FC<SelectProviderProps> = ({ onSelect, onBack }) => {
    const [provider, setProvider] = useState<any>(undefined);
    const isFormValid = !!provider;
    const providerData = [
        { label: 'El Once', value: 'El Once' },
        { label: 'El Doce', value: 'El Doce' },
    ];

    return (
        <View style={styles.card}>
            <Text style={styles.title}>Seleccionar proveedor</Text>
            <Text style={styles.label}>Proveedor</Text>
            <View style={styles.pickerContainer}>
                <Dropdown
                    data={providerData}
                    labelField="label"
                    valueField="value"
                    value={provider}
                    placeholder="Selecciona un proveedor"
                    onChange={item => setProvider(item.value)}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    style={styles.dropdown}
                    renderItem={(item: { label: string; value: string }, selected?: boolean) => {
                        const index = providerData.findIndex(p => p.value === item.value);
                        const isLast = index === providerData.length - 1;

                        return (
                            <View style={[styles.dropdownItem, isLast && styles.noBorder]}>
                                <Text style={styles.itemTextStyle}>{item.label}</Text>
                            </View>
                        );
                    }}
                />
            </View>

            <TouchableOpacity
                style={[
                    styles.button,
                    styles.saveButton,
                    !isFormValid && styles.buttonDisabled,
                ]}
                onPress={() => onSelect(provider)}
                disabled={!isFormValid}
            >
                <Image source={require('../../assets/icons/check.png')} style={styles.buttonIcon} />
                <Text style={styles.buttonText}>Confirmar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, styles.backButton]} onPress={onBack}>
                <Image source={require('../../assets/icons/chevron-left.png')} style={styles.buttonIcon} />
                <Text style={styles.buttonText}>Volver</Text>
            </TouchableOpacity>
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
    },
    dropdown: {
        height: 50,
        paddingHorizontal: 12,
        backgroundColor: '#fff',
    },
    dropdownItem: {
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        backgroundColor: '#fff',
        borderStyle: 'dashed',
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
    placeholderStyle: {
        fontSize: 16,
        color: '#999',
        fontFamily: 'Inter',
    },
    noBorder: {
        borderBottomWidth: 0,
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
    saveButton: {
        marginTop: 10,
        backgroundColor: '#6371B2',
    },
    backButton: {
        backgroundColor: '#85BFA9',
    },
    buttonIcon: {
        width: 16,
        height: 16,
    },
    buttonText: {
        fontSize: 14,
        color: '#FFFFFF',
        fontFamily: 'Inter',
        fontWeight: 'bold'
    },
    buttonDisabled: {
        backgroundColor: '#999',
        shadowOpacity: 0,
        elevation: 0,
    },
});

export default NewProviderCard;
