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

const MapLocation = () => {
    return (
        <View style={{ flex: 1, backgroundColor: '#111111' }}>
            <StatusBar
                style="light"
                backgroundColor="#111111"
            />

            <SafeAreaView style={{ marginTop: 35, width: "90%", alignSelf: 'center' }}>
                <OnBoardingHeader title="Map Location" />
               

                <ScrollView>
                    <Text style={{ marginTop: 30, fontFamily: 'ABRe', fontSize: 16, color: acolors.white }}>Pin your Saloon Location on Map to continue</Text>
                    <Image
                        style={{ marginTop: 10, width: '100%', resizeMode: 'stretch' }}
                        source={require('../assets/mapImg.png')}
                    />
                    <Text style={{ marginTop: 20, fontFamily: 'ABRe', fontSize: 16, color: acolors.white }}>Address</Text>
                    <Text style={{ marginTop: 10, fontFamily: 'ABRe', fontSize: 16, color: acolors.white }}>123 street, 11 apartment ,USA,11221</Text>

                </ScrollView>
            </SafeAreaView>
            <MainButton
                text="Continue"
                btnStyle={{ position: 'absolute', bottom: 100, width: "90%", alignSelf: 'center' }}
                onPress={() => { navigate('SalonTiming') }}
            />

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

export default MapLocation
