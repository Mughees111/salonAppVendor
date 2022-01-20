import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useEffect, useState } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image, SafeAreaView, FlatList, Dimensions, Alert, ScrollView, Switch, TextInput } from 'react-native'
import { goBack } from '../../Navigations';
import { acolors } from '../Components/AppColors';
import { MainButton } from '../Components/Buttons';
import { OnBoardingHeader } from '../Components/Header';
import { ArrowDown } from '../Components/Svgs';



const CancelAppointment = () => {

    const [ans, setAns] = useState('');

    return (
        <View style={{ flex: 1, backgroundColor: acolors.bgColor }}>
            <StatusBar
                style='light'
            // translucent={false}
            />
            <SafeAreaView style={{ flex: 1, marginTop: 25 }}>
                <View style={{ paddingHorizontal: 20 }}>
                    <OnBoardingHeader title="Cancellation" />
                    <Text style={{ marginTop: 20, fontFamily: 'ABRe', fontSize: 13, color: 'white', lineHeight: 21.5 }}>Write down the reason why you canceling the appointment</Text>
                    <TextInput
                        textAlignVertical='top'
                        multiline={true}
                        style={{ width: "100%", minHeight: 100, fontSize: 16, padding: 10, paddingVertical: 10, fontFamily: 'ABRe', color: 'white', borderRadius: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)', marginTop: 10 }}
                        placeholder='Write Here ...'
                        placeholderTextColor={"rgba(255,255,255,0.5)"}
                    />
                    <Text style={{ marginTop: 20, fontFamily: 'ABRe', fontSize: 13, color: 'white', lineHeight: 21.5 }}>Alternative Time</Text>
                    <Text style={{ marginTop: 5, fontFamily: 'ABRe', fontSize: 13, color: 'white', lineHeight: 21.5 }}>Suggest your client the alternative time for appointment</Text>
                    <Text style={{ fontFamily: 'ABRe', fontSize: 14, color: '#FCFCFC', marginTop: 20 }}>Date</Text>
                    <TouchableOpacity style={{ width: "100%", paddingHorizontal: 10, height: 42, marginTop: 5, borderWidth: 1, borderColor: '#FCFCFC', borderRadius: 8, alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
                        <Text style={{ fontFamily: 'ABRe', fontSize: 14, color: '#FCFCFC' }}>21-10-2021</Text>
                        <ArrowDown />
                    </TouchableOpacity>
                    <Text style={{ fontFamily: 'ABRe', fontSize: 14, color: '#FCFCFC', marginTop: 10 }}>Time</Text>
                    <TouchableOpacity style={{ width: "100%", paddingHorizontal: 10, height: 42, marginTop: 5, borderWidth: 1, borderColor: '#FCFCFC', borderRadius: 8, alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
                        <Text style={{ fontFamily: 'ABRe', fontSize: 14, color: '#FCFCFC' }}>11:15 am</Text>
                        <ArrowDown />
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', width: "90%", alignSelf: 'center', position: 'absolute', bottom: 50, justifyContent: 'space-between' }}>
                    <TouchableOpacity
                        onPress={() => goBack()}
                        style={{ width: "45%", height: 45, borderRadius: 26, marginTop: 20, borderWidth: 1, borderColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontFamily: 'ABRe', fontSize: 11.94, color: 'white' }}>Go Back</Text>
                    </TouchableOpacity>
                    <MainButton
                        text={"Cancel Now"}
                        btnStyle={{ marginTop: 20, width: "45%" }}
                        textStyle={{ fontSize: 11.94 }}

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



export default CancelAppointment
