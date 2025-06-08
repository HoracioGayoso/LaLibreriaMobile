import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    Image
} from 'react-native';
import { NewProviderProps } from 'types';

const NewProviderCard: React.FC<NewProviderProps> = ({ onCreate, onBack }) => {
    const [name, setName] = useState<string | undefined>(undefined);
    const [email, setEmail] = useState<string | undefined>(undefined);
    const [phone, setPhone] = useState<string | undefined>(undefined);
    const [web, setWeb] = useState<string | undefined>(undefined);

    const [nameTouched, setNameTouched] = useState(false);
    const [emailTouched, setEmailTouched] = useState(false);

    const [phoneTouched, setPhoneTouched] = useState(false);

    const isValidEmailFormat = (email?: string) => {
        if (!email) return false;
        // Expresión regular simple para validar email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
    const numericPhone = phone?.replace(/\D/g, '') || '';
    const isPhoneValid = numericPhone.length <= 13 && numericPhone.length >= 10;
    const isNameValid = name ? name?.trim().length > 0 : false;
    const isEmailValid = isValidEmailFormat(email);
    const isFormValid = isNameValid && isEmailValid && isPhoneValid;
    const handleCreate = () => {
        if (!isFormValid) return;

        const newProvider = {
            name: name?.trim() || '',
            email: email?.trim() || '',
            phone: phone?.trim() || '',
            web: web?.trim() || '',
        };
        onCreate(newProvider);
    };

    return (
        <View style={styles.card}>
            <Text style={styles.title}>Nuevo proveedor</Text>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>
                    Nombre <Text style={styles.required}>*</Text>
                </Text>
                <TextInput
                    style={[
                        styles.input,
                        nameTouched && !isNameValid && styles.inputError
                    ]}
                    placeholder="Ingrese el nombre del nuevo proveedor"
                    placeholderTextColor="#888"
                    onChangeText={(value) => {
                        setName(value);
                        if (!nameTouched) setNameTouched(true);
                    }}
                    value={name}
                    onBlur={() => setNameTouched(true)}
                />
                {nameTouched && !isNameValid && (
                    <Text style={styles.errorText}>El nombre es obligatorio.</Text>
                )}
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>
                    Email <Text style={styles.required}>*</Text>
                </Text>
                <TextInput
                    style={[
                        styles.input,
                        emailTouched && !isEmailValid && styles.inputError
                    ]}
                    placeholder="Ingrese el correo del nuevo proveedor"
                    placeholderTextColor="#888"
                    onChangeText={(value) => {
                        setEmail(value);
                        if (!emailTouched) setEmailTouched(true);
                    }}
                    value={email}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    onBlur={() => setEmailTouched(true)}
                />
                {emailTouched && !isEmailValid && (
                    <Text style={styles.errorText}>Ingrese un correo con formato válido.</Text>
                )}
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>
                    Teléfono <Text style={styles.required}>*</Text>
                </Text>
                <TextInput
                    style={[
                        styles.input,
                        phoneTouched && !isPhoneValid && styles.inputError
                    ]}
                    placeholder="Ingrese el teléfono del nuevo proveedor"
                    placeholderTextColor="#888"
                    onChangeText={(value) => {
                        setPhone(value);
                        if (!phoneTouched) setPhoneTouched(true);
                    }}
                    value={phone}
                    keyboardType="phone-pad"
                    maxLength={13}
                    onBlur={() => setPhoneTouched(true)}
                />
                {phoneTouched && !isPhoneValid && (
                    <Text style={styles.errorText}>
                        El teléfono es obligatorio: debe tener entre 10 y 13 caracteres numéricos.
                    </Text>
                )}
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Sitio Web</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Ingrese el sitio web del nuevo proveedor"
                    placeholderTextColor="#888"
                    onChangeText={setWeb}
                    value={web}
                    keyboardType="url"
                    autoCapitalize="none"
                />
            </View>

            <TouchableOpacity style={[
                styles.button,
                styles.saveButton,
                !isFormValid && styles.buttonDisabled,
            ]} onPress={handleCreate} disabled={!isFormValid}
            >
                <Image source={require('../../assets/icons/save_icon.png')} style={styles.buttonIcon} />
                <Text style={styles.buttonText}>Guardar</Text>
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
    required: {
        color: 'red',
        fontWeight: 'bold',
    },
    input: {
        backgroundColor: '#fff',
        borderWidth: 2,
        borderColor: '#ccc',
        borderRadius: 12,
        paddingVertical: 10,
        color: '#000',
        paddingHorizontal: 25,
        fontFamily: 'Inter',
    },
    inputError: {
        borderColor: 'red',
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginLeft: 10,
        marginTop: 2,
    },
    inputContainer: {
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