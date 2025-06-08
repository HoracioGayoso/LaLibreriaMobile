import React, { useRef } from 'react';
import { View, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { SearchBarProps } from 'types';

const SearchBar: React.FC<SearchBarProps> = ({ value, onChangeText, placeholder = 'Buscar por nombre o código' }) => {
    const inputRef = useRef<TextInput>(null);

    return (
        <View style={styles.container}>
            <TextInput
                ref={inputRef}
                style={styles.input}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor="#888"
            />
            <TouchableOpacity onPress={() => inputRef.current?.focus()}>
                <Image source={require('../../../assets/icons/search-lg.png')} style={styles.buttonIcon} />
            </TouchableOpacity>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#ccc',
        borderRadius: 12,
        paddingHorizontal: 15,
        backgroundColor: '#fff',
        color: '#000',
        fontFamily: 'Inter',
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#000'
    },
    buttonIcon: {
        width: 20,
        height: 20,
    }
});

export default SearchBar;
