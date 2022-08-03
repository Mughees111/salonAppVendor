import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native'
import { goBack, navigate } from '../../Navigations';
import { ArrowLeft, ArrowRight, FbIcon, GoogleIcon, LOGO } from '../Components/Svgs';
import { acolors } from '../Components/AppColors';
import CustomTextInput from '../Components/CustomTextInput';
import PrivacyPicker from '../Components/PrivacyPicker';
import { MainButton } from '../Components/Buttons';
import CodeInput from 'react-native-confirmation-code-input';
import { apiRequest } from '../utils/apiCalls';
import Loader from '../utils/Loader';
import DropdownAlert from 'react-native-dropdownalert';

var alertRef;
const ForgetPassOpt = (props) => {


    const [otp, setOTP] = useState('');
    const [loading, setLoading] = useState(false)

    function verifyOTP() {

        setLoading(true)
        const reqObj = {
            code: otp,
            slip: props?.route?.params?.slip
        }

        apiRequest(reqObj, 'verify_otp')
            .then(data => {
                setLoading(false)
                console.log('data == ' , data);
                if (data.action == 'success') {
                    navigate('NewPass', {
                        slip: props?.route?.params?.slip
                    });
                }
                else {
                    setLoading(false);
                    alertRef.alertWithType("error", "Error", data.error);
                }
            })
            .catch(err => {
                setLoading(false);
                alertRef.alertWithType("error", "Error", 'Network Error');
            })
    }

    return (
        <View style={{ flex: 1,backgroundColor:acolors.bgColor }}>
            <StatusBar
                style='light'
                backgroundColor={acolors.bgColor}
                translucent={false}
            />
            {loading && <Loader />}
            <DropdownAlert ref={(ref) => alertRef = ref} />
            <SafeAreaView style={{ marginTop: 35, width: "90%", alignSelf: 'center' }}>
                <View style={{ alignSelf: "center", alignItems: "center" }}>

                    <LOGO />
                </View>
                <ScrollView>
                    <Text style={{ marginTop: 20, fontFamily: 'PBl', fontSize: 22, color: acolors.primary }}>OTP</Text>
                    <Text style={{ marginTop: 3, fontFamily: 'PRe', fontSize: 16, color: acolors.white }}>Enter OTP to continue</Text>

                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 30 }}>

                        {/* <View style={rootStyle}> */}
                        <CodeInput
                            // ref="codeInputRef2"
                            secureTextEntry
                            // compareWithCode='AsDW2'
                            activeColor={acolors.white}
                            inactiveColor={acolors.white}
                            keyboardType='numeric'
                            autoFocus={false}
                            ignoreCase={true}
                            inputPosition='center'
                            size={50}
                            codeLength={6}
                            onFulfill={(isValid) => { setOTP(isValid) }}
                            containerStyle={{ marginTop: 30 }}
                            codeInputStyle={{ width: 42, height: 42, borderRadius: 8, borderWidth: 1.3 }}
                        />


                        {/* <CustomTextInput
                            autoFocus={true}
                            keyboardType="number-pad"
                            style={{ width: 42, height: 42, borderRadius: 8, borderWidth: 1.3 }}
                        />
                     
                        <CustomTextInput
                            style={{ width: 42, height: 42, borderRadius: 8, borderWidth: 1.3, marginLeft: 12 }}
                        />
                        <CustomTextInput
                            style={{ width: 42, height: 42, borderRadius: 8, borderWidth: 1.3, marginLeft: 12 }}
                        /> */}

                    </View>



                    {/* <Text style={{ alignSelf: 'center', fontSize: 16, color: acolors.white, marginTop: 15, fontFamily: 'PMe' }}>or continue with</Text>
                    <View style={{ alignSelf: 'center', flexDirection: 'row', marginTop: 15 }}>
                        <TouchableOpacity style={{ width: 92, height: 48, borderWidth: 1, borderColor: acolors.white, borderRadius: 56, alignItems: 'center', justifyContent: 'center', }}>
                            <FbIcon />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ width: 92, height: 48, borderWidth: 1, borderColor: acolors.white, borderRadius: 56, alignItems: 'center', justifyContent: 'center', marginLeft: 10 }}>
                            <GoogleIcon />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity>
                        <Text style={{ alignSelf: 'center', fontSize: 16, color: acolors.white, marginTop: 20, fontFamily: 'PMe' }}>Already have an account? Sign In</Text>
                    </TouchableOpacity> */}
                </ScrollView>

            </SafeAreaView>
            <TouchableOpacity
                onPress={() => verifyOTP()}
                disabled={otp.length == 6 ? false : true}
                style={{
                    width: "100%",
                    height: 45,
                    backgroundColor: acolors.primary,
                    alignItems: 'center',
                    justifyContent: 'center',

                    borderRadius: 23,
                    position: 'absolute',
                    bottom: 50,
                    width: "89%",
                    alignSelf: 'center',
                    opacity: otp.length == 4 ? 1 : 0.6
                }}>
                <Text style={{ color: '#111111', fontFamily: 'PMe', fontSize: 16 }}>Next</Text>
            </TouchableOpacity>

        </View >
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

export default ForgetPassOpt