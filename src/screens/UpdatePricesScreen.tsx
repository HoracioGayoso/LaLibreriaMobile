import React, { useState } from 'react';
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
import { createProveedor } from '../services/server/proveedorService';
type ProductCardNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const UpdatePricesScreen: React.FC = () => {

    const navigation = useNavigation<ProductCardNavigationProp>();
    const [newProvider, setNewProvider] = useState(false);
    const [selectProvider, setSelectProvider] = useState(false);
    const [updatePrices, setUpdatePrices] = useState(false);
    const [visible, setVisible] = useState(false);
    const [provider, setProvider] = useState<any>(null);
    const [showCreateSuccessModal, setShowCreateSuccessModal] = useState(false);

    const document = [
        { codigo_barra: "7790400018608", precio: 1273.45 },
        { codigo_barra: "4026700408157", precio: 859.99 },
        { codigo_barra: "6926341895409", precio: 3021.75 },
        { codigo_barra: "7792560463432", precio: 475.30 },
        { codigo_barra: "7796569233227", precio: 6200.00 },
        { codigo_barra: "70330172975", precio: 799.90 },
        { codigo_barra: "70330172982", precio: 1240.25 },
        { codigo_barra: "70330200234", precio: 995.00 },
        { codigo_barra: "70330200241", precio: 2134.67 },
        { codigo_barra: "70330139503", precio: 390.10 },
        { codigo_barra: "7033017658", precio: 678.50 },
        { codigo_barra: "70330176584", precio: 1845.95 },
        { codigo_barra: "70330176607", precio: 2599.99 },
        { codigo_barra: "4005400926215", precio: 730.00 },
        { codigo_barra: "4549526608933", precio: 999.95 },
        { codigo_barra: "4549526607219", precio: 1400.30 },
        { codigo_barra: "7795513177822", precio: 230.40 },
        { codigo_barra: "7792621083649", precio: 4200.75 },
        { codigo_barra: "7792621128760", precio: 975.90 },
        { codigo_barra: "7798160260633", precio: 1999.99 },
        { codigo_barra: "7798160260749", precio: 385.00 },
        { codigo_barra: "7798004930036", precio: 3245.25 },
        { codigo_barra: "7798004930029", precio: 670.75 },
        { codigo_barra: "6932653908881", precio: 2100.60 },
        { codigo_barra: "7794765003521", precio: 525.30 },
        { codigo_barra: "7796191523406", precio: 820.20 },
        { codigo_barra: "21001400728", precio: 1199.49 },
        { codigo_barra: "7796893021965", precio: 1645.00 },
        { codigo_barra: "7792533000956", precio: 307.70 },
        { codigo_barra: "7798047120685", precio: 750.00 },
        { codigo_barra: "7794765000742", precio: 1860.45 },
        { codigo_barra: "6945410412156", precio: 1045.99 },
        { codigo_barra: "635468112301", precio: 278.30 },
        { codigo_barra: "7798047120128", precio: 1920.80 },
        { codigo_barra: "6923794420783", precio: 3650.00 },
        { codigo_barra: "4716982060333", precio: 970.90 },
        { codigo_barra: "7796728000271", precio: 630.45 },
        { codigo_barra: "6920620009082", precio: 2380.00 },
        { codigo_barra: "6940843171793", precio: 845.65 },
        { codigo_barra: "6926474634746", precio: 1075.30 },
        { codigo_barra: "4710268258827", precio: 900.00 },
        { codigo_barra: "8072018053011", precio: 510.50 },
        { codigo_barra: "8072021062901", precio: 1675.40 },
        { codigo_barra: "740617309720", precio: 720.00 },
        { codigo_barra: "91163251323", precio: 410.10 },
        { codigo_barra: "7793198133010", precio: 2940.00 },
        { codigo_barra: "5993102218945", precio: 889.80 },
        { codigo_barra: "4007817106525", precio: 1425.20 },
        { codigo_barra: "70330408982", precio: 960.00 },
        { codigo_barra: "4015000090056", precio: 1899.99 },
        { codigo_barra: "7792216856511", precio: 330.60 },
        { codigo_barra: "7790895000430", precio: 1250.00 },
    ];

    const handleCreateProvider = async (newProviderData: any): Promise<void> => {
        try {
            const createdProvider = await createProveedor(newProviderData);
            setProvider(createdProvider.name);  // o el campo que quieras mostrar
            setNewProvider(false);
            setShowCreateSuccessModal(true);
            setTimeout(() => {
                setShowCreateSuccessModal(false);
            }, 2000);
        } catch (error) {
            console.error('Error al crear proveedor:', error);
        }
    };

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
                                <FilterTag value={provider.nombre} onDelete={() => setProvider('')} />
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
                        setProvider(null);
                        setVisible(true);

                        setTimeout(() => {
                            setVisible(false);
                            setUpdatePrices(false);
                        }, 2500);
                    }} provider={provider}></UpdatePricesListCard>
                )}
            <>
                {/* Modal de creación exitosa */}
                <Modal visible={showCreateSuccessModal} transparent animationType="fade">
                    <View style={styles.modalOverlay}>
                        <CustomModal message="Creación de Proveedor exitosa" />
                    </View>
                </Modal>
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
