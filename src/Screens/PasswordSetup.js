import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native'
import { goBack, navigate } from '../../Navigations';
import { ArrowLeft, ArrowRight, FbIcon, GoogleIcon } from '../Components/Svgs';
import { acolors } from '../Components/AppColors';
import CustomTextInput from '../Components/CustomTextInput';
import PrivacyPicker from '../Components/PrivacyPicker';
import { MainButton } from '../Components/Buttons';
import { OnBoardingHeader } from '../Components/Header';
import { retrieveItem, storeItem } from "../utils/functions";
import DropdownAlert from 'react-native-dropdownalert';



var alertRef;
const PasswordSetup = () => {

    const [sal_password, setSalPass] = useState('')

    function next() {

        if (sal_password.length < 8) {
            alertRef.alertWithType("error", "Error", "Password length must contain 8 numbers");
            return;
        }
        retrieveItem('login_data')
            .then(data => {
                var data1 = data;
                data1.step = 3;
                data1.sal_password = sal_password;
                storeItem('login_data', data1)
                    .then(data => {
                        navigate('SearchAddress')
                    })
            })



    }


    return (
        <View style={{ flex: 1, backgroundColor: '#111111' }}>
            <StatusBar
                style="light"
                backgroundColor="#111111"
            />
            <DropdownAlert ref={(ref) => alertRef = ref} />
            <SafeAreaView style={{ marginTop: 35, width: "90%", alignSelf: 'center' }}>
                <OnBoardingHeader title="Password Setup" />
                <ScrollView>
                    <Text style={{ marginTop: 30, fontFamily: 'ABRe', fontSize: 16, color: acolors.white }}>Please create a strong password to secure your account </Text>
                    <CustomTextInput
                        placeholder="Password"
                        style={{ marginTop: 20 }}
                        onChangeText={setSalPass}
                    />

                    <MainButton
                        text="Continue"
                        btnStyle={{ marginTop: 140 }}
                        onPress={() => {
                            next()
                            // navigate('SearchAddress')
                        }}
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

export default PasswordSetup
