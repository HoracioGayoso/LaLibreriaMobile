import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { strings } from '../../assets/strings';
import { HomeCardProps } from 'types';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { useNavigation } from '@react-navigation/native';

type HomeCardNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
const HomeCard: React.FC<HomeCardProps> = ({userName, handleLogOut}) => {
    const navigation = useNavigation<HomeCardNavigationProp>();
    return (
        <View style={styles.card}>
            <Text style={styles.welcomeText}>
                {strings.homeScreen.welcome} <Text style={styles.boldText}>{userName}</Text>
            </Text>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity style={[styles.button, styles.alertButton]}>
                    <Image source={require('../../assets/icons/alert_icon.png')} style={styles.butonIcon} />
                    <Text style={styles.buttonText}>{strings.homeScreen.alerts}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.productButton]}>
                    <Image source={require('../../assets/icons/product_icon.png')} style={styles.butonIcon} />
                    <Text style={styles.buttonText}>{strings.homeScreen.products}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.pricesButton]}>
                    <Image source={require('../../assets/icons/prices_icon.png')} style={styles.butonIcon} />
                    <Text style={styles.buttonText}>{strings.homeScreen.loadPrices}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.exitButton]} onPress={handleLogOut}>
                    <Image source={require('../../assets/icons/logout_icon.png')} style={styles.butonIcon} />
                    <Text style={styles.buttonText}>{strings.homeScreen.logout}</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.largeButton} onPress={() => navigation.navigate('BarcodeScanner')}>
                <View style={styles.largeButtonIcon}>
                    {/* Aquí podrías usar un ícono de alguna librería como react-native-vector-icons */}
                    <Image source={require('../../assets/icons/camera_icon.png')} style={styles.cameraIcon} />
                </View>
                <Text style={styles.largeButtonText}>Buscá o agregá un producto</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        borderRadius: 20,
        paddingHorizontal: 20,
        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        alignItems: 'center',
        width: '90%',
        alignSelf: 'center',
        paddingVertical: 60
    },
    welcomeText: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20,
        color: 'black',
        fontFamily: 'Inter',
    },
    boldText: {
        fontFamily: 'Inter',
        fontWeight: 'bold',
        fontSize: 20
    },
    buttonsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    button: {
        width: '48%',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginBottom: 10,
        flexDirection: 'row',
        paddingLeft: 10,
        elevation: 5,
    },
    alertButton: {
        backgroundColor: '#F47272', // Rojo
    },
    productButton: {
        backgroundColor: '#6E83F2', // Azul
    },
    pricesButton: {
        backgroundColor: '#FFD65C', // Amarillo
    },
    exitButton: {
        backgroundColor: '#82C79D', // Verde
    },
    buttonText: {
        fontSize: 14,
        color: '#FFFFFF',
        fontFamily: 'Inter',
        fontWeight: 'bold' 
    },
    largeButton: {
        width: '100%',
        borderRadius: 15,
        borderWidth: 2,
        borderColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 35
    },
    largeButtonIcon: {
        marginBottom: 10,
    },
    iconText: {
        fontSize: 24,
    },
    largeButtonText: {
        fontSize: 16,
        color: 'black',
        fontFamily: 'Inter',
    },
    butonIcon: {
        width: 14,
        height: 14,
        marginHorizontal: 5
    },
    cameraIcon: {
        width: 60,
        height: 60,
    }
});

export default HomeCard;
