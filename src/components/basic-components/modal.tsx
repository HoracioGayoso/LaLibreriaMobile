import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
} from 'react-native';

const CustomModal: React.FC<{ message: string }> = ({
    message
}) => {

    return (
        <View style={styles.container}>
            <Image source={require('../../../assets/icons/success.png')} style={styles.successIcon} />

            <Text style={styles.message}>{message}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
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
    message: {
        fontSize: 12,
        fontWeight: '400',
        fontFamily: 'Inter',
        color: '#000000',
        textAlign: 'center',
        paddingHorizontal: 15,
        paddingBottom: 35
    },
    successIcon: {
        marginTop: 20,
        marginBottom: 15,
        width: 34,
        height: 34,
        alignSelf: 'center',
    }
});

export default CustomModal;
