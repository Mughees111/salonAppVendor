import React from 'react'
import { StyleSheet, TouchableOpacity, Text } from 'react-native'
import { acolors } from './AppColors';

export const MainButton = ({ btnStyle, text, textStyle, onPress,disabled }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled ? disabled : false}
            style={[styles.mainBtn, btnStyle]}>
            <Text style={[styles.textStyle, textStyle]}>{text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    mainBtn: {
        width: "100%",
        height: 45,
        backgroundColor: acolors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 23
    },
    textStyle: {
        color: '#111111',
        fontFamily: 'ABRe',
        fontSize: 16
    }
})


