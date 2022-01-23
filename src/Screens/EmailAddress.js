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
import AsyncStorage from '@react-native-async-storage/async-storage';

import { storeItem, validateEmail } from '../utils/functions';
import Loader from '../utils/Loader';
import DropdownAlert from 'react-native-dropdownalert';
import { apiRequest } from '../utils/apiCalls';


var alertRef;
const EmailAddress = () => {

    const [sal_email, setSalEmail] = useState('')
    const [loading, setLoading] = useState(false)

    function next() {
        if (!validateEmail(sal_email)) {
            alertRef.alertWithType("error", "Error", "Please provide a valid email");
            return;
        }
        setLoading(true)

        apiRequest({ sal_email: sal_email }, 'check_sal_email_exists')
            .then(data => {
                if (data.action == 'success') {
                    setLoading(false)
                    alertRef.alertWithType('success', 'Success');
                    const data1 = {
                        "step": 1,
                        "sal_email": sal_email
                    }
                    storeItem('login_data', data1)
                        .then(data => {
                            navigate('AboutInfo')
                        })
                }
                else {
                    setLoading(false)
                    alertRef.alertWithType('error', 'Error', data.error);
                }
            })
            .catch(err => {
                setLoading(false)
            })

    }

    return (
        <View style={{ flex: 1, backgroundColor: '#111111' }}>
            <StatusBar
                style='light'
                backgroundColor={acolors.bgColor}
                translucent={false}
            // translucent={false}
            />
            {loading && <Loader />}
            <DropdownAlert ref={(ref) => alertRef = ref} />
            <SafeAreaView style={{ marginTop: 35, width: "90%", alignSelf: 'center' }}>
                <OnBoardingHeader title="Email Address" />

                <ScrollView>
                    <Text style={{ marginTop: 10, fontFamily: 'ABRe', fontSize: 16, color: acolors.white }}>Fill your Email Address to continue</Text>
                    <CustomTextInput
                        placeholder="Email Address"
                        onChangeText={setSalEmail}
                        style={{ marginTop: 20 }}
                    />
                    <Text style={{ alignSelf: 'center', fontSize: 16, color: acolors.white, marginTop: 55, fontFamily: 'ABRe' }}>or continue with</Text>



                    <View style={{ alignSelf: 'center', flexDirection: 'row', marginTop: 15 }}>
                        <TouchableOpacity style={{ width: 92, height: 48, borderWidth: 1, borderColor: acolors.white, borderRadius: 56, alignItems: 'center', justifyContent: 'center', }}>
                            <FbIcon />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ width: 92, height: 48, borderWidth: 1, borderColor: acolors.white, borderRadius: 56, alignItems: 'center', justifyContent: 'center', marginLeft: 10 }}>
                            <GoogleIcon />
                        </TouchableOpacity>
                    </View>

                    <MainButton
                        text="Continue"
                        btnStyle={{ marginTop: 30 }}
                        onPress={() => {
                            next()
                            // navigate('AboutInfo') 
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

export default EmailAddress
