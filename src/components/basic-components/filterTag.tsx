import React, { useRef } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';
import { FilterTagProps } from 'types';

const FilterTag: React.FC<FilterTagProps> = ({ value, onDelete }) => {

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{value}</Text>
            <TouchableOpacity onPress={() => onDelete(value)}>
                <Image source={require('../../../assets/icons/x-close.png')} style={styles.buttonIcon} />
            </TouchableOpacity>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: '#CD5352',
        color: '#fff',
        fontFamily: 'Inter',
        alignSelf: 'flex-start',
    },
    text: {
        fontSize: 12,
        color: '#fff'
    },
    buttonIcon: {
        width: 12,
        height: 12,
        marginLeft: 10
    }
});

export default FilterTag;
