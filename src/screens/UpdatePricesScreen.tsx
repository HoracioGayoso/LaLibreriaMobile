import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Image,
    Text,
    View,
    Modal
} from 'react-native';
import Background from '../components/Background';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, Filter } from 'types';
import FilterTag from '../components/basic-components/filterTag';
import NewProviderCard from '../components/NewProviderCard';
import SelectProviderCard from '../components/SelectProviderCard';
import UpdatePricesListCard from '../components/UpdatePricesListCard';
import CustomModal from '../components/basic-components/modal';
type ProductCardNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const UpdatePricesScreen: React.FC = () => {

    const navigation = useNavigation<ProductCardNavigationProp>();
    const [provider, setProvider] = useState('El Once');
    const [newProvider, setNewProvider] = useState(false);
    const [selectProvider, setSelectProvider] = useState(false);
    const [updatePrices, setUpdatePrices] = useState(false);
    const [visible, setVisible] = useState(false);
    const document = [
        { barcode: "barcode1", newPrice: 12000.99 },
        { barcode: "barcode2", newPrice: 8000.5 },
        { barcode: "barcode3", newPrice: 1400.75 },
        { barcode: "barcode4", newPrice: 9000.99 },
        { barcode: "barcode5", newPrice: 6000.25 },
        { barcode: "barcode6", newPrice: 10000.0 },
        { barcode: "barcode7", newPrice: 700.45 }
    ];

    const handleCreateProvider = (createdProvider: any): void => {
        setProvider(createdProvider.name);
        setNewProvider(false);
    }
    return (
        <Background>
            {!newProvider && !selectProvider && !updatePrices && (
                <View style={styles.card}>

                    {/* Parte superior */}
                    <View style={{ flex: 1 }}>
                        <Text style={styles.listTitle}>Actualización de Precios</Text>
                        <TouchableOpacity
                            style={[styles.button, styles.newProviderButton, { marginTop: 5 }]}
                            onPress={() => setNewProvider(true)}
                        >
                            <Image
                                source={require('../../assets/icons/pencil-line.png')}
                                style={styles.buttonIcon}
                            />
                            <Text style={styles.buttonText}>Cargar nuevo proveedor</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button, styles.selectProviderButton, { marginTop: 5 }]}
                            onPress={() => setSelectProvider(true)}
                        >
                            <Image
                                source={require('../../assets/icons/people-icon.png')}
                                style={styles.buttonIcon}
                            />
                            <Text style={styles.buttonText}>Seleccionar proveedor</Text>
                        </TouchableOpacity>
                        {provider && (
                            <>
                                <FilterTag value={provider} onDelete={() => setProvider('')} />
                                <TouchableOpacity
                                    style={[
                                        styles.largeButton,
                                        !provider && styles.largeButtonDisabled,
                                    ]}
                                    onPress={() => setUpdatePrices(true)}
                                    disabled={!provider}
                                >
                                    <View style={styles.largeButtonIcon}>
                                        <Image
                                            source={require('../../assets/icons/csv-icon.png')}
                                            style={[styles.csvIcon, !provider && styles.csvIconDisabled]}
                                        />
                                    </View>
                                    <Text
                                        style={[
                                            styles.largeButtonText,
                                            !provider && styles.largeButtonTextDisabled,
                                        ]}
                                    >
                                        Subir un archivo .csv
                                    </Text>
                                </TouchableOpacity>
                            </>
                        )}
                    </View>

                    {/* Botón "Volver" abajo */}
                    <View style={{ marginTop: 10 }}>
                        <TouchableOpacity
                            style={[styles.button, styles.backButton]}
                            onPress={() => navigation.goBack()}
                        >
                            <Image
                                source={require('../../assets/icons/chevron-left.png')}
                                style={styles.buttonIcon}
                            />
                            <Text style={styles.buttonText}>Volver</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
            }
            {
                newProvider && (
                    <NewProviderCard onCreate={handleCreateProvider} onBack={() => setNewProvider(false)}></NewProviderCard>
                )
            }
            {
                selectProvider && (
                    <SelectProviderCard onSelect={(provider: any) => { setProvider(provider), setSelectProvider(false) }} onBack={() => setSelectProvider(false)}></SelectProviderCard>
                )
            }
            {
                updatePrices && (
                    <UpdatePricesListCard onBack={() => setUpdatePrices(false)} document={document} onUpdate={() => {
                        setVisible(true);

                        setTimeout(() => {
                            setVisible(false);
                            setUpdatePrices(false);
                        }, 2500);
                    }}></UpdatePricesListCard>
                )}
            <>
                <Modal visible={visible} transparent={true} animationType="fade">
                    <View style={styles.modalOverlay}>
                        <CustomModal message="Los precios han sido actualizados correctamente" />
                    </View>
                </Modal>
            </>
        </Background >
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
        height: '60%',
        justifyContent: 'space-between',
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
    newProviderButton: {
        backgroundColor: '#F1C938',
    },
    selectProviderButton: {
        backgroundColor: '#6371B2',
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
    largeButton: {
        width: '100%',
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        marginVertical: 20
    },
    largeButtonIcon: {
        marginBottom: 10,
        color: '#000'
    },
    largeButtonText: {
        fontSize: 16,
        color: 'black',
        fontFamily: 'Inter',
    },
    largeButtonTextDisabled: {
        color: '#B0B0B0',
    },
    largeButtonDisabled: {
        borderColor: '#B0B0B0',
    },
    csvIcon: {
        width: 60,
        height: 60,
    },
    csvIconDisabled: {
        tintColor: '#B0B0B0',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // fondo negro semitransparente
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default UpdatePricesScreen;
