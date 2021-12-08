import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native'
import { goBack, navigate } from '../../Navigations';
import { ArrowLeft, ArrowRight, FbIcon, GoogleIcon } from '../Components/Svgs';
import { acolors } from '../Components/AppColors';
import CustomTextInput from '../Components/CustomTextInput';
import PrivacyPicker from '../Components/PrivacyPicker';
import { MainButton } from '../Components/Buttons';

const AboutInfo = () => {
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
                    <Text style={{ fontFamily: 'AbRe', fontSize: 16, color: acolors.white }}>About You</Text>
                    <Text>          </Text>
                </View>

                <ScrollView>
                    <Text style={{ marginTop: 30, fontFamily: 'AbRe', fontSize: 16, color: acolors.white }}>Tell us more about yourself and your saloon</Text>
                    <CustomTextInput
                        placeholder="Saloon Name"
                        style={{ marginTop: 20 }}
                    />
                    <CustomTextInput
                        placeholder="Your Name"
                        style={{ marginTop: 20 }}
                    />

                    <View style={{ flexDirection: 'row', }}>
                        <View style={{ width: "17%", height: 42, marginTop: 15, borderWidth: 1, borderColor: '#FCFCFC', borderRadius: 8, alignItems: 'center', justifyContent: 'center' }}>
                            {/* <Text>92</Text> */}
                            <PrivacyPicker
                                selected={{ title: "+1" }}
                                data={{ title: "+1" }}
                                onValueChange={(index, title) => {
                                    // setCondition(title.title)
                                }}
                            />
                        </View>
                        <CustomTextInput
                            placeholder="Phone Number"
                            style={{ marginLeft: "3%", width: "79%", marginTop: 15, }}
                        />
                    </View>                  
                    <MainButton
                        text="Continue"
                        btnStyle={{ marginTop: 30 }}
                    onPress={() => { navigate('PasswordSetup') }}
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

export default AboutInfo
