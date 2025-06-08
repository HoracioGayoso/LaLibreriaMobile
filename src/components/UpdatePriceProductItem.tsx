import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { formatPrice, formatMargin } from '../utils';

const UpdatePriceProductItem: React.FC<{ product: any, newPrice: number, onDelete: () => void }> = ({ product, newPrice, onDelete }) => {
    const localImage = require('../../assets/icons/product-placeholder.png');
    const imageSource = product.image
        ? { uri: product.image }
        : localImage;

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image
                    source={imageSource}
                    style={styles.productImage}
                    resizeMode="contain"
                />
            </View>
            <View style={styles.dataContainer}>
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productData}>Margen de ganancia: {formatMargin(product.profitMargin.toString())}</Text>
            </View>
            <View style={styles.pricesContainer}>
                <Text style={styles.oldPrice}>{formatPrice(product.price)}</Text>
                <Image
                    source={require('../../assets/icons/chevron-down-double.png')}
                    style={styles.newPriceIcon}
                />
                <Text style={styles.newPrice}>{formatPrice(newPrice)}</Text>
            </View>
            <View style={styles.deleteContainer}>
                <TouchableOpacity style={styles.deleteContainer} onPress={onDelete} activeOpacity={0.6}>
                    <Image
                        source={require('../../assets/icons/trash-03.png')}
                        style={styles.deleteIcon}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 20,
        paddingVertical: 5,
        paddingHorizontal: 15,
        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 25,
        alignSelf: 'center',
        flexDirection: 'row',
        width: 300,
        justifyContent: 'space-between',
    },
    imageContainer: {
        alignItems: 'center',
        marginVertical: 5,
        borderRadius: 9,
        borderWidth: 3,
        borderColor: '#9C9C9C',
        height: 50,
        width: 50,
        justifyContent: 'center',
        alignSelf: 'center',
    },
    productImage: {
        width: 25,
        height: 25,
    },
    dataContainer: {
        flexDirection: 'column',
        width: '40%',
        justifyContent: 'center',
        marginLeft: 10
    },
    pricesContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '30%',
    },
    productName: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#000'
    },
    productData: {
        fontSize: 10,
        color: '#000'
    },
    oldPrice: {
        fontSize: 12,
        color: '#CD5352',
        fontWeight: 'bold',
        marginBottom: 2
    },
    newPrice: {
        fontSize: 12,
        color: '#85BFA9',
        fontWeight: 'bold',
        marginTop: 2
    },
    newPriceIcon: {
        width: 12,
        height: 12
    },
    deleteIcon: {
        width: 20,
        height: 20,
        tintColor: 'black',
    },
    deleteContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default UpdatePriceProductItem;
