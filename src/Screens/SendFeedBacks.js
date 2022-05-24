import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useEffect, useState } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image, SafeAreaView, FlatList, Dimensions, Alert, ScrollView, Switch, TextInput } from 'react-native'
import DropdownAlert from 'react-native-dropdownalert';
import { goBack } from '../../Navigations';
import { acolors } from '../Components/AppColors';
import { MainButton } from '../Components/Buttons';
import { OnBoardingHeader } from '../Components/Header';
import Loader from '../utils/Loader';
import { retrieveItem, useForceUpdate, doConsole, storeItem } from '../utils/functions';
import { apiRequest } from '../utils/apiCalls';

var alertRef;

const SendFeedBack = () => {

    const [ans, setAns] = useState('');
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);


    function sendFeedBack() {


        if (ans == '') {
            alertRef.alertWithType('error', 'Error', 'Please fill in required fields');
        }
        retrieveItem('login_data')
            .then(data => {
                const postObj = {
                    token: data?.token,
                    text: text,
                    is_enjoy: ans == 'yes' ? 1 : 0,
                }
                console.log(postObj);
                setLoading(true)
                apiRequest(postObj, 'send_feedback')
                    .then(data => {
                        setLoading(false)
                        if (data?.action == 'success') {
                            alertRef.alertWithType('success', 'Success');
                            goBack();
                        }
                        else {
                            alertRef.alertWithType('error', 'Error', data?.error);
                        };
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
                translucent={false}
                backgroundColor={acolors.bgColor}
            />

            <SafeAreaView style={{ flex: 1, marginTop: 10 }}>
                <View style={{ paddingHorizontal: 20 }}>
                    <OnBoardingHeader title="Send Feedback" />
                    <Text style={{ marginTop: 20, fontFamily: 'ABRe', fontSize: 13, color: 'white', lineHeight: 21.5 }}>Let us Know what you like and what you’d like us to work on.{"\n"}
                        Are you enjoying the new version of Couaff ?
                    </Text>

                    <TouchableOpacity
                        onPress={() => { setAns('yes') }}
                        style={{ flexDirection: 'row', marginTop: 20, borderBottomWidth: 1, paddingBottom: 10, borderColor: 'rgba(255,255,255,0.2)' }}>
                        <View
                            style={[styles.radioBtn, ans == 'yes' && { borderColor: acolors.primary }]}>
                            {ans == 'yes' && <View style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: acolors.primary }}></View>}
                        </View>
                        <Text style={{ fontFamily: 'ABRe', fontSize: 14, color: "#E9E9E9", marginLeft: 7 }}>Yes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => { setAns('no') }}
                        style={{ flexDirection: 'row', marginTop: 20, borderBottomWidth: 1, paddingBottom: 10, borderColor: 'rgba(255,255,255,0.2)' }}>
                        <View

                            style={[styles.radioBtn, ans == 'bo' && { borderColor: acolors.primary }]}>
                            {ans == 'no' && <View style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: acolors.primary }}></View>}
                        </View>
                        <Text style={{ fontFamily: 'ABRe', fontSize: 14, color: "#E9E9E9", marginLeft: 7 }}>No</Text>
                    </TouchableOpacity>
                    <TextInput
                        textAlignVertical='top'
                        onChangeText={setText}
                        multiline={true}
                        style={{ width: "100%", minHeight: 180, padding: 10, paddingVertical: 10, fontFamily: 'ABRe', color: 'white', borderRadius: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)', marginTop: 10 }}
                        placeholder='Tell us more ...'
                        placeholderTextColor={"rgba(255,255,255,0.5)"}
                    />

                    <MainButton
                        onPress={() => sendFeedBack()}
                        btnStyle={{ marginTop: 50, width: "100%", alignSelf: 'center' }}
                        text={"Send"}
                    />
                </View>

            </SafeAreaView >

        </View >
    )
}

const styles = StyleSheet.create({
    radioBtn: {
        width: 20,
        height: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',

    }
})



export default SendFeedBack
