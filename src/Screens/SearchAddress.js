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

const SearchAddress = () => {
    return (
        <View style={{ flex: 1, backgroundColor: '#111111' }}>
            <StatusBar
                style="light"
                backgroundColor="#111111"
                translucent={false}
            />

            <SafeAreaView style={{ marginTop: 10, width: "90%", alignSelf: 'center' }}>
                <OnBoardingHeader title="Your Address" />
               
                <ScrollView>
                    <Text style={{ marginTop: 30, fontFamily: 'ABRe', fontSize: 16, color: acolors.white }}>Where can clients find you?</Text>
                    <CustomTextInput
                        placeholder="Search street & number"
                        style={{ marginTop: 20 }}
                    />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',marginTop:20 }}>
                        <Text style={{ fontFamily: 'ABRe', fontSize: 16, color: acolors.white }}>Can’t find your address?</Text>
                        <TouchableOpacity style={{ alignItems: 'center',flexDirection:'row' }}>
                            <PlusCircle/>
                            <Text style={{ fontFamily: 'ABRe', fontSize: 16, color: acolors.white ,marginLeft:5}}>Add Location</Text>
                        </TouchableOpacity>

                    </View>

                    <MainButton
                        text="Continue"
                        btnStyle={{ marginTop: 140 }}
                    onPress={() => { navigate('Address') }}
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

export default SearchAddress
