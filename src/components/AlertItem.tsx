import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { formatPrice, formatMargin } from '../utils';

const AlertItem: React.FC<{ product: any }> = ({ product }) => {
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
                {product.current_stock === 0 && (
                    <View style={styles.stockContainer}>
                        <Text style={styles.productName}>{product.name}</Text>
                        <Text style={styles.noStock}>Sin stock</Text>
                    </View>
                )
                }
                {product.current_stock > 0 && (
                    <View style={styles.stockContainer}>
                        <Text style={styles.productName}>{product.name}</Text>
                        <Text style={styles.productData}>Stock actual: {product.current_stock} ({product.unit})</Text>
                        <Text style={styles.productData}>
                            Stock limite: {product.min_stock} ({product.unit})
                        </Text>
                    </View>
                )
                }
            </View>
            <View style={styles.alertContainer}>
                <Image
                    source={product.current_stock === 0 ? require('../../assets/icons/red-alert.png') : require('../../assets/icons/yellow-alert.png')}
                    style={styles.alertIcon}
                />
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
    stockContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    alertContainer: {
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
    noStock: {
        fontSize: 10,
        fontWeight: '400',
        color: '#9C9C9C',
        fontFamily: 'Inter',
        fontStyle: 'italic'
    },
    productData: {
        fontSize: 10,
        color: '#000'
    },
    alertIcon: {
        width: 24,
        height: 24
    }
});

export default AlertItem;
