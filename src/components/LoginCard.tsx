import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { TextInput, useTheme } from 'react-native-paper';
import { strings } from '../../assets/strings';
import { Auth } from '../services';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native'; // Importa useNavigation

type RootStackParamList = {
    Login: undefined;
    Home: undefined;
};
type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

//importar auth aca
const LoginCard: React.FC = () => {
    
    const theme = useTheme();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation<LoginScreenNavigationProp>();

    const handleSignIn = async () => {
        try {
            await Auth.signIn(email, password);
            navigation.navigate('Home'); // Navega a Home si el inicio de sesión es exitoso
        } catch (error) {
            console.error("Error during sign in:", error);
            // Aquí podrías mostrar un mensaje de error al usuario
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            const user = await Auth.signInWithGoogle(); // Obtén el usuario de Google
            if (user) {
                console.log(user)
                navigation.navigate('Home'); // Navega a Home si el usuario existe
            }
        } catch (error) {
            console.error("Error during Google sign in:", error);
        }
    };
    

    const customTheme = {
        ...theme,
        fonts: {
            ...theme.fonts,
            bodyLarge: { ...theme.fonts.bodyLarge, fontFamily: 'FuzzyBubblesRegular' },
        },
    };

    return (
        <View style={styles.card}>
            <Image source={require('../../assets/icons/logo_azul.png')} style={styles.logo} />
            <Text style={styles.welcomeText}>{strings.loginScreen.welcomeMessage}</Text>

            <TouchableOpacity style={styles.googleButton} onPress={handleGoogleSignIn}>
                <Image source={require('../../assets/icons/logo_google.png')} style={styles.googleIcon} />
                <Text style={styles.googleButtonText}>{strings.loginScreen.googleSignIn}</Text>
            </TouchableOpacity>

            <Image source={require('../../assets/icons/separador_o.png')} style={styles.separator} />

            <TextInput
                label="Email"
                mode="outlined"
                placeholder={strings.loginScreen.emailPlaceholder}
                keyboardType="email-address"
                outlineStyle={{ borderRadius: 12, borderWidth: 2 }}
                style={styles.input}
                theme={{
                    ...customTheme,
                    colors: { primary: '#9C9C9C' },
                }}
                contentStyle={{ fontFamily: 'FuzzyBubblesRegular', color: 'black'}}
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                label="Contraseña"
                mode="outlined"
                placeholder={strings.loginScreen.passwordPlaceholder}
                secureTextEntry
                outlineStyle={{ borderRadius: 12, borderWidth: 2 }}
                style={styles.input}
                theme={{
                    ...customTheme,
                    colors: { primary: '#9C9C9C' },
                }}
                contentStyle={{ fontFamily: 'FuzzyBubblesRegular' }}
                value={password}
                onChangeText={setPassword}
            />
            <TouchableOpacity style={styles.googleButton} onPress={handleSignIn}>
                <Text style={styles.googleButtonText}>{strings.loginScreen.loginButton}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        width: '90%',
        alignItems: 'center',
    },
    logo: {
        width: 100,
        height: 100,
        marginVertical: 10,
    },
    separator: {
        width: 300,
        height: 15,
        marginBottom: 15,
    },
    welcomeText: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 35,
        color: 'black',
        fontFamily: 'FuzzyBubblesBold',
    },
    subText: {
        fontSize: 14,
        textAlign: 'center',
        color: 'gray',
        marginBottom: 20,
        fontFamily: 'FuzzyBubblesRegular',
    },
    googleButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        paddingVertical: 10,
        borderRadius: 12,
        marginBottom: 20,
        width: '100%',
        justifyContent: 'center',
        borderColor: "#9C9C9C",
        borderWidth: 2,
    },
    googleIcon: {
        width: 20,
        height: 20,
        marginRight: 10,
    },
    googleButtonText: {
        color: 'black',
        fontFamily: 'FuzzyBubblesBold',
        fontWeight: '400',
        fontSize: 12,
        lineHeight: 15.6,
        textAlign: 'center',
    },
    input: {
        width: '100%',
        marginBottom: 10,
        backgroundColor: '#FFFFFF',
        fontSize: 12,
        fontWeight: '400',
    },
});

export default LoginCard;
