import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useEffect, useState } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image, SafeAreaView, FlatList, Dimensions, Alert, ScrollView, Switch, TextInput } from 'react-native'
import { acolors } from '../Components/AppColors';
import { MainButton } from '../Components/Buttons';
import { OnBoardingHeader } from '../Components/Header';



const MassMsg = () => {

    const [ans, setAns] = useState('');

    return (
        <View style={{ flex: 1, backgroundColor: acolors.bgColor }}>
            <StatusBar
                style='light'
            // translucent={false}
            />
            <SafeAreaView style={{ flex: 1, marginTop: 25 }}>
                <View style={{ paddingHorizontal: 20 }}>
                    <OnBoardingHeader title="Mass Message" />
                    <Text style={{ marginTop: 20, fontFamily: 'ABRe', fontSize: 13, color: 'white', lineHeight: 21.5 }}>Send a mass notification message to all your clients</Text>

                   
                    <TextInput
                        textAlignVertical='top'
                        multiline={true}
                        style={{ width: "100%", minHeight: 180, padding: 10, paddingVertical: 10, fontFamily: 'ABRe', color: 'white', borderRadius: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)', marginTop: 10 }}
                        placeholder='Write Here ...'
                        placeholderTextColor={"rgba(255,255,255,0.5)"}
                    />

                    <MainButton
                        btnStyle={{ marginTop: 50, width: "100%", alignSelf: 'center' }}
                        text={"Send"}
                    />
                </View>

            </SafeAreaView >
        </View >
    )
}

const styles = StyleSheet.create({
    radioBtn: {
        width: 20,
        height: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',

    }
})



export default MassMsg
