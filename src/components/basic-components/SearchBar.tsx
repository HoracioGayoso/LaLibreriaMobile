import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { SearchBarProps } from 'types';

const SearchBar: React.FC<SearchBarProps> = ({ value, onChangeText, placeholder = 'Buscar por nombre o código' }) => {
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor="#888"
            />
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
});

export default SearchBar;
