import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native'
import { goBack, navigate } from '../../Navigations';
import { ArrowLeft, ArrowRight, FbIcon, GoogleIcon, PlusCircle } from '../Components/Svgs';
import { acolors } from '../Components/AppColors';
import CustomTextInput from '../Components/CustomTextInput';
import PrivacyPicker from '../Components/PrivacyPicker';
import { MainButton } from '../Components/Buttons';
import { OnBoardingHeader } from '../Components/Header';

const Address = () => {
    return (
        <View style={{ flex: 1, backgroundColor: '#111111' }}>
            <StatusBar
                style="light"
                backgroundColor="#111111"
            />

            <SafeAreaView style={{ marginTop: 35, width: "90%", alignSelf: 'center' }}>
                <OnBoardingHeader title="Your Address" />
                <ScrollView>
                    <Text style={{ marginTop: 30, fontFamily: 'AbRe', fontSize: 16, color: acolors.white }}>Where can clients find you?</Text>
                    <CustomTextInput
                        placeholder="Search street & number"
                        style={{ marginTop: 20 }}
                    />
                    <CustomTextInput
                        placeholder="Appartment, room or suite number (optional)"
                        style={{ marginTop: 20 }}
                    />
                    <CustomTextInput
                        placeholder="City"
                        style={{ marginTop: 20 }}
                    />
                    <CustomTextInput
                        placeholder="Postal Code"
                        style={{ marginTop: 20 }}
                    />
                    <MainButton
                        text="Continue"
                        btnStyle={{ marginTop: 20 }}
                        onPress={() => { navigate('MapLocation') }}
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

export default Address
