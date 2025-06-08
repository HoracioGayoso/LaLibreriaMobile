import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, Modal, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ViewProductCardProps } from 'types';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { RootStackParamList } from 'types';
import { StackNavigationProp } from '@react-navigation/stack';
import FullScreenImage from './FullScreenImage';

const ViewProductCard: React.FC<ViewProductCardProps> = ({ product, onBack, onEdit }) => {
    const [image, setImage] = useState(product?.image || null);
    const [name, setName] = useState(product?.name || null);

    return (
        <View style={styles.card}>
            <View style={styles.horizontalContainer}>
                <View style={styles.imageContainer}>
                    <Image
                        source={
                            image ? { uri: image }
                                : require('../../assets/icons/product-placeholder.png')
                        }
                        style={image ? styles.productImage : styles.placeholderImage}
                        resizeMode="contain"
                    />
                </View>
                <View style={styles.titleContainer}>
                    <View style={styles.titleRow}>
                        <Text style={styles.title}>Producto </Text>
                        <Text style={styles.titleText}>#{product.barcode}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.productDataContainer}>
                <Text style={styles.label}>Nombre: <Text style={styles.text}>{product.name}</Text></Text>
                <Text style={styles.label}>Proveedor: <Text style={styles.text}>{product.provider_name}</Text></Text>
                <Text style={styles.label}>Categoria: <Text style={styles.text}>{product.category}</Text></Text>
                <Text style={styles.label}>Precio Mayorista: <Text style={styles.text}>{product.price}</Text></Text>
                <Text style={styles.label}>Margen de ganancia: <Text style={styles.text}>{product.profitMargin}</Text></Text>
                <Text style={styles.label}>Stock actual: <Text style={styles.text}>{product.current_stock}</Text></Text>
            </View>
            <TouchableOpacity style={[
                styles.button,
                styles.saveButton,
            ]} onPress={onEdit}
            >
                <Image source={require('../../assets/icons/pencil-line.png')} style={styles.buttonIcon} />
                <Text style={styles.buttonText}>Editar</Text>
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
        fontWeight: '300',
        marginBottom: 5,
        textAlign: 'left',
        color: '#000',
        fontFamily: 'Inter',
    },
    titleText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
        textAlign: 'left',
        color: '#000',
        fontFamily: 'Inter',
    },
    label: {
        fontSize: 14,
        fontWeight: '300',
        textAlign: 'left',
        color: '#000',
        fontFamily: 'Inter',
    },
    text: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'left',
        color: '#000',
        fontFamily: 'Inter',
    },
    imageContainer: {
        alignItems: 'center',
        marginVertical: 5,
        marginRight: 5,
        borderRadius: 9,
        borderWidth: 3,
        borderColor: '#9C9C9C',
        height: 80,
        width: 80,
        justifyContent: 'center',
        alignSelf: 'center',
    },
    productImage: {
        width: 60,
        height: 60,
    },
    placeholderImage: {
        width: 30,
        height: 30,
    },
    horizontalContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 25,
    },
    titleContainer: {
        flex: 1,
        marginLeft: 10,
    },
    titleRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
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
    productDataContainer: {
        marginBottom: 20,
    }
});

export default ViewProductCard;
