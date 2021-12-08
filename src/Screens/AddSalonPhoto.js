import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native'
import { goBack, navigate } from '../../Navigations';
import { ArrowLeft, ArrowRight, ArrowRight1, CameraIcon, FbIcon, GoogleIcon, PlusCircle } from '../Components/Svgs';
import { acolors } from '../Components/AppColors';
import CustomTextInput from '../Components/CustomTextInput';
import PrivacyPicker from '../Components/PrivacyPicker';
import { MainButton } from '../Components/Buttons';
import { OnBoardingHeader } from '../Components/Header';

const AddSalonPhoto = () => {



    return (
        <View style={{ flex: 1, backgroundColor: '#111111' }}>
            <StatusBar
                style="light"
                backgroundColor="#111111"
            />

            <SafeAreaView style={{ marginTop: 35, width: "90%", alignSelf: 'center' }}>
                <OnBoardingHeader title="Show off Your Workspace" />
                <ScrollView>
                    <Text style={{ marginTop: 30, fontFamily: 'AbRe', fontSize: 16, color: acolors.white, marginBottom: 10 }}>This photo will be displayed on your saloon profile when clients look for you on Couaff</Text>
                    <TouchableOpacity style={{ marginTop: 10, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.1)', borderStyle: "dashed", width: "100%", borderRadius: 3, height: 187, alignItems: 'center', justifyContent: 'center' }}>
                        <CameraIcon />
                        <Text style={{ color: 'rgba(255, 255, 255, 0.1)', fontSize: 13, fontFamily: 'AbRe', marginTop: 10 }}>Add Workspace photo</Text>

                    </TouchableOpacity>


                </ScrollView>
            </SafeAreaView>
            <MainButton
                text="Continue"
                btnStyle={{ position: 'absolute', bottom: 100, width: "90%", alignSelf: 'center' }}
                onPress={() => { navigate('AddServices') }}
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

export default AddSalonPhoto
