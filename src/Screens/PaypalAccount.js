import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native'
import { goBack, navigate } from '../../Navigations';
import { ArrowLeft, PaypalIcon } from '../Components/Svgs';
import { acolors } from '../Components/AppColors';
import { TextInput } from 'react-native-gesture-handler';
import CustomTextInput from '../Components/CustomTextInput';
import PrivacyPicker from '../Components/PrivacyPicker';
import { MainButton } from '../Components/Buttons';

import { apiRequest } from '../utils/apiCalls';
import { retrieveItem, useForceUpdate, doConsole, update_dp, update_dp_2, storeItem, validateEmail } from '../utils/functions';
import Loader from '../utils/Loader';
import DropdownAlert from 'react-native-dropdownalert';
import { Context } from '../Context/DataContext';
import { changeLoggedIn } from '../../Common';


var alertRef;

const PaypalAccount = (props) => {

    const [postObj, setPostObj] = useState({
        acc_type: 'paypal',
        p_first_name: '',
        p_last_name: '',
        p_email: ''
    });

    const [loading, setLoading] = useState(false)

    function add_account() {


        if (!postObj.p_first_name) {
            alertRef.alertWithType('error', "Error", "Please enter first name");
            return;
        }
        if (!postObj.p_last_name) {
            alertRef.alertWithType('error', "Error", "Please enter last name");
            return;
        }
        if (!postObj.p_email) {
            alertRef.alertWithType('error', "Error", "Please enter email");
            return;
        }

        retrieveItem('login_data')
            .then(data => {

                postObj.token = data?.token
                console.log(postObj)

                setLoading(true)
                apiRequest(postObj, 'add_account')
                    .then(data => {
                        setLoading(false)
                        if (data.action == 'success') {
                            alertRef.alertWithType('success', "Success", "");
                            storeItem('login_data', data?.data)
                            setTimeout(() => {
                                props.navigation.popToTop();
                            }, 1000);
                        }
                        else {
                            alertRef.alertWithType('error', "Error", data?.error);
                        }
                    })
                    .catch(err => {
                        setLoading(false)
                    })
            })
    }


    return (
        <View style={{ flex: 1, backgroundColor: acolors.bgColor }}>
            {loading && <Loader />}
            <DropdownAlert ref={(ref) => alertRef = ref} />
            <StatusBar
                style='light'
                backgroundColor={acolors.bgColor}
                translucent={false}
            />

            <SafeAreaView style={{ marginTop: 10, width: "90%", alignSelf: 'center' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <TouchableOpacity
                        onPress={() => goBack()}
                        style={{ width: 34, height: 34, borderRadius: 34 / 2, backgroundColor: 'rgba(255,255,255,0.1)', alignItems: 'center', justifyContent: 'center' }}>
                        <ArrowLeft />
                    </TouchableOpacity>
                    <Text style={{ fontFamily: 'PMe', fontSize: 16, color: acolors.white }}>Paypal</Text>
                    <Text>          </Text>
                </View>
                <ScrollView>

                    <View style={{ flexDirection: 'row', marginTop: 30, alignItems: 'center' }}>
                        <Text style={{ marginTop: 3, fontFamily: 'PRe', fontSize: 16, color: acolors.white, }}>Add paypal details </Text>
                        <PaypalIcon />
                    </View>
                    <CustomTextInput
                        placeholder="First name"
                        style={{ marginTop: 20 }}
                        onChangeText={(v) => {
                            setPostObj({
                                ...postObj,
                                p_first_name: v
                            })
                        }}
                    />
                    <CustomTextInput
                        placeholder="Last name"
                        style={{ marginTop: 20 }}
                        onChangeText={(v) => {
                            setPostObj({
                                ...postObj,
                                p_last_name: v
                            })
                        }}
                    />
                    <CustomTextInput
                        placeholder="Email"
                        style={{ marginTop: 20 }}
                        onChangeText={(v) => {
                            setPostObj({
                                ...postObj,
                                p_email: v
                            })
                        }}
                    />



                    <MainButton
                        text="Save"
                        btnStyle={{ marginTop: 30 }}
                        onPress={() => { add_account(); }}
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

export default PaypalAccount
