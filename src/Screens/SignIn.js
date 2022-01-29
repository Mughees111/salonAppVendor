import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native'
import { goBack, navigate } from '../../Navigations';
import { ArrowLeft, LOGO } from '../Components/Svgs';
import { acolors } from '../Components/AppColors';
import CustomTextInput from '../Components/CustomTextInput';
import PrivacyPicker from '../Components/PrivacyPicker';
import { MainButton } from '../Components/Buttons';

import Loader from '../utils/Loader';
import { validateEmail, doConsole, storeItem } from '../utils/functions';

// import { changeLoggedIn } from '../../../Common';
import DropdownAlert from 'react-native-dropdownalert';
import { urls } from '../utils/Api_urls';
import { apiRequest } from '../utils/apiCalls';
import { changeLoggedIn } from '../../Common';




var alertRef;
const SignIn = () => {


    // const navigation = useNavigation()
    const [loading, setLoading] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const doNext = () => {

        var e = email;
        e = e.trim();
        if (!validateEmail(e)) {
            alertRef.alertWithType("error", "Error", "Please provide a valid email address");
            return;
        }

        setLoading(true)
        var dbData = {
            sal_email: e,
            sal_password:password
        };
        doConsole(" I request @ " + urls.API + "login_vendor");
        apiRequest(dbData, "login_vendor")
            .then(data => {
                console.log(data)
                if (data.action == "success") {

                    storeItem("login_data", data.data).then(() => {
                        setLoading(false)
                        changeLoggedIn.changeNow(1);
                    })
                }
                else {
                    console.log('i am in ')
                    setLoading(false)
                    console.log(data)
                    alertRef.alertWithType("error", "Error", data.error);
                }

            })
            .catch(err => {
                doConsole('err')
                doConsole(err)
                setLoading(false)
                alertRef.alertWithType("error", urls.error_title, urls.error);
            })

    }







    return (
        <View style={{ flex: 1 }}>
            <StatusBar
                style='light'
                backgroundColor={acolors.bgColor}
                translucent={false}
            />
            <Image
                style={{ position: 'absolute', width: "100%", height: "100%", }}
                source={require('../assets/signUpImg.png')}
            />
            <Image
                style={{ position: 'absolute', height: "100%", width: "100%" }}
                source={require('../assets/signUpMask.png')}
            />
            <SafeAreaView style={{ marginTop: 35, width: "90%", alignSelf: 'center' }}>
                <TouchableOpacity
                    onPress={() => goBack()}
                    style={{ width: 34, height: 34, borderRadius: 34 / 2, backgroundColor: 'rgba(255,255,255,0.1)', alignItems: 'center', justifyContent: 'center' }}>
                    <ArrowLeft />
                </TouchableOpacity>
                <View style={{ alignSelf: "center", alignItems: "center" }}>
                    <LOGO />
                </View>
                <ScrollView>
                    <View style={{ marginTop: -15 }}>
                        <Text style={{ marginTop: 20, fontFamily: 'ABRe', fontSize: 22, color: acolors.primary }}>Welcome Back</Text>
                        <Text style={{ marginTop: 3, fontFamily: 'ABRe', fontSize: 16, color: acolors.white }}>Login to continue</Text>
                        <CustomTextInput
                            onChangeText={setEmail}
                            placeholder="Email"
                            keyboardType={"email-address"}
                            style={{ marginTop: 20 }}
                        />

                        <CustomTextInput
                            onChangeText={setPassword}
                            placeholder="Password"
                            style={{ marginTop: 15, }}
                            secureTextEntry={true}
                        />
                        {/* <TouchableOpacity
                            onPress={() => navigate('ForgetPass')}
                            style={{ alignSelf: 'flex-end', marginTop: 10 }}>
                            <Text style={{ fontFamily: 'PRe', fontSize: 14, color: acolors.white }}>Forgot Password?</Text>
                        </TouchableOpacity> */}

                        <MainButton
                            text="Log In"
                            btnStyle={{ marginTop: 60 }}
                            onPress={() => {
                                doNext();
                                //  navigate('BottomTabs') 
                            }}
                        />

                        <TouchableOpacity
                            style={{ marginTop: 30 }}
                            onPress={() => navigate('EmailAddress')}
                        >
                            <Text style={{ alignSelf: 'center', fontSize: 16, color: acolors.white, marginTop: 20, fontFamily: 'ABRe' }}>Don’t have an account? Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>

            </SafeAreaView>
            {loading && <Loader />}
            <DropdownAlert ref={(ref) => alertRef = ref} />

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

export default SignIn

