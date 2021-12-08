import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, FlatList } from 'react-native'
import { goBack, navigate } from '../../Navigations';
import { ArrowDown, ArrowLeft, ArrowRight, CloseDropDown, FbIcon, GoogleIcon } from '../Components/Svgs';
import { acolors } from '../Components/AppColors';
import CustomTextInput from '../Components/CustomTextInput';
import PrivacyPicker from '../Components/PrivacyPicker';
import { MainButton } from '../Components/Buttons';
import { OnBoardingHeader } from '../Components/Header';

const ServiceDetails = () => {

    const [expandList, setExpandList] = useState(false)
    const prices = [
        "Fixed",
        "Starts at",
        "Varies",
        "Free",
        "Don’t Show"
    ];


    return (
        <View style={{ flex: 1, backgroundColor: '#111111' }}>
            <StatusBar
                style="light"
                backgroundColor="#111111"
            />

            <SafeAreaView style={{ marginTop: 35, width: "90%", alignSelf: 'center' }}>
                <OnBoardingHeader title="Service Details" />
                <ScrollView>
                    <Text style={{ marginTop: 30, fontFamily: 'AbRe', fontSize: 16, color: acolors.white }}>You’ll be able to add a description and adjust advanced settings</Text>
                    <CustomTextInput
                        placeholder="Service name"
                        style={{ marginTop: 20 }}
                    />
                    <CustomTextInput
                        placeholder="Duration"
                        style={{ marginTop: 20 }}
                    />
                    <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'space-between' }}>
                        <TouchableOpacity
                            disabled={expandList ? true : false}
                            onPress={() => setExpandList(true)}
                            style={{ flexDirection: 'row', width: "42%", paddingVertical: 10, justifyContent: 'space-between', borderWidth: 1, borderColor: 'white', borderRadius: 10, paddingHorizontal: 10 }}>

                            {
                                expandList ?
                                    <FlatList
                                        data={prices}
                                        keyExtractor={(item, index) => index.toString()}
                                        renderItem={({ item, index }) => {
                                            console.log(index)
                                            return (
                                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <TouchableOpacity
                                                        onPress={() => { setExpandList(false) }}
                                                    >
                                                        <Text style={{ fontFamily: 'AbRe', fontSize: 14, color: '#FCFCFC', }}>{item}</Text>
                                                    </TouchableOpacity>
                                                    {
                                                        index == 0 &&
                                                        <TouchableOpacity
                                                            onPress={() => { setExpandList(false) }}
                                                        >
                                                            <CloseDropDown />
                                                        </TouchableOpacity>
                                                    }
                                                </View>
                                            )
                                        }}
                                    />
                                    :
                                    <>
                                        <Text style={{ fontFamily: 'AbRe', fontSize: 14, color: '#FCFCFC', }}>Fixed</Text>
                                        <ArrowDown style={{ marginTop: 5 }} />
                                    </>

                            }
                        </TouchableOpacity>

                        <CustomTextInput
                            placeholder="Price-$"
                            keyboardType="number-pad"
                            style={{ marginTop: 0, width: "50%" }}
                        />
                    </View>






                    <MainButton
                        text="Save"
                        btnStyle={{ marginTop: 30 }}
                        onPress={() => { navigate('PaymentMethd') }}
                    />
                </ScrollView>

            </SafeAreaView>

        </View>
    )
}

const styles = StyleSheet.create({
    activeDot: {
        width: 9,
        height: 9,
        borderRadius: 4.5,
        backgroundColor: '#E2B378',
        marginLeft: 5
    },
    inActiveDot: {
        width: 9,
        height: 9,
        borderRadius: 4.5,
        backgroundColor: '#FCFCFC',
        marginLeft: 8
    },

})

export default ServiceDetails
