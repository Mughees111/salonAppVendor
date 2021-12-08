import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native'
import { goBack, navigate } from '../../Navigations';
import { ArrowLeft, ArrowRight, FbIcon, GoogleIcon, PlusCircle } from '../Components/Svgs';
import { acolors } from '../Components/AppColors';
import CustomTextInput from '../Components/CustomTextInput';
import PrivacyPicker from '../Components/PrivacyPicker';
import { MainButton } from '../Components/Buttons';

const SearchAddress = () => {
    return (
        <View style={{ flex: 1, backgroundColor: '#111111' }}>
            <StatusBar
                style="light"
                backgroundColor="#111111"
            />

            <SafeAreaView style={{ marginTop: 35, width: "90%", alignSelf: 'center' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <TouchableOpacity
                        onPress={() => goBack()}
                        style={{ width: 34, height: 34, borderRadius: 34 / 2, backgroundColor: 'rgba(255,255,255,0.1)', alignItems: 'center', justifyContent: 'center' }}>
                        <ArrowLeft />
                    </TouchableOpacity>
                    <Text style={{ fontFamily: 'AbRe', fontSize: 16, color: acolors.white }}>Your Address</Text>
                    <Text>          </Text>
                </View>

                <ScrollView>
                    <Text style={{ marginTop: 30, fontFamily: 'AbRe', fontSize: 16, color: acolors.white }}>Where can clients find you?</Text>
                    <CustomTextInput
                        placeholder="Search street & number"
                        style={{ marginTop: 20 }}
                    />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',marginTop:20 }}>
                        <Text style={{ fontFamily: 'AbRe', fontSize: 16, color: acolors.white }}>Can’t find your address?</Text>
                        <TouchableOpacity style={{ alignItems: 'center',flexDirection:'row' }}>
                            <PlusCircle/>
                            <Text style={{ fontFamily: 'AbRe', fontSize: 16, color: acolors.white ,marginLeft:5}}>Add Location</Text>
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
