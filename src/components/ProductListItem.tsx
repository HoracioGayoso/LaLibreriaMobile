import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { formatPrice, formatMargin } from '../utils';

const ProductListItem: React.FC<{ product: any }> = ({ product }) => {
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
                <Text style={styles.productData}>Proveedor: {product.provider_name}</Text>
                <Text style={styles.productData}>Margen de ganancia: {formatMargin(product.profitMargin.toString())}</Text>
                <Text style={styles.productData}>
                    Stock actual: {product.current_stock} ({product.unit})
                </Text>
            </View>
            <View style={styles.priceContainer}>
                <Text style={styles.productName}>{formatPrice(product.price)}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 30,
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
        marginRight: 10,
        marginLeft: 5,
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
        width: '50%'
    },
    priceContainer: {
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent: 'center',
        width: '25%',
        paddingRight: 10
    },
    productName: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#000'
    },
    productData: {
        fontSize: 10,
        color: '#000'
    }
});

export default ProductListItem;
