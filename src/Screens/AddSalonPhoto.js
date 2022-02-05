import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Alert } from 'react-native'
import { goBack, navigate } from '../../Navigations';
import { ArrowLeft, ArrowRight, ArrowRight1, CameraIcon, FbIcon, GoogleIcon, PlusCircle } from '../Components/Svgs';
import { acolors } from '../Components/AppColors';
import CustomTextInput from '../Components/CustomTextInput';
import PrivacyPicker from '../Components/PrivacyPicker';
import { MainButton } from '../Components/Buttons';
import { OnBoardingHeader } from '../Components/Header';

import { update_dp, update_dp_2, retrieveItem, storeItem } from '../utils/functions';
import DropdownAlert from 'react-native-dropdownalert';
import { useFocusEffect } from '@react-navigation/native';
import { apiRequest } from '../utils/apiCalls';
import Loader from '../utils/Loader';



var alertRef;
const AddSalonPhoto = () => {


    const [imgsUrlForUpload, setImgsUrlForUpload] = useState();
    const [imgsUrlToShow, setImgsUrlToShow] = useState();

    const [imgsUrlForUploadP, setImgsUrlForUploadP] = useState();
    const [imgsUrlToShowP, setImgsUrlToShowP] = useState();

    const [loading, setLoading] = useState(false)
    const [userData, setUserData] = useState()


    useFocusEffect(React.useCallback(
        () => {
            retrieveItem('login_data')
                .then(data => {
                    setUserData(data)
                })
        },
        [],
    ))

    function cameraUplaodP() {
        var x = alertRef;
        setLoading(true)
        update_dp_2(1, userData.token, "public_image")
            .then(data => {
                setLoading(false)
                console.log('data2 = ')
                console.log(data)
                if (data.action == "success") {
                    console.log('asd')
                    setLoading(false)
                    setImgsUrlForUploadP(data.filename);
                    setImgsUrlToShowP(data.url)
                }
                else {
                    setLoading(false)
                    x.alertWithType('error', 'Error', data.error);
                }
            })
            .catch((error) => {
                console.log(error)
                setLoading(false)
                // x.alertWithType('error', 'error', "Internet Error");
                // setLoading(false)
            })
    }

    function gallaryUploadP() {

        var x = alertRef;
        setLoading(true)
        update_dp(1, userData.token, "public_image")
            .then(data => {
                setLoading(false)
                console.log('data2 = ')
                console.log(data)

                if (data.action == "success") {
                    console.log('asd')
                    setLoading(false)
                    setImgsUrlForUploadP(data.filename);
                    setImgsUrlToShowP(data.url)
                }
                else {
                    setLoading(false)
                    x.alertWithType('error', 'Error', data.error);
                }
            })
            .catch((error) => {
                setLoading(false)
                // x.alertWithType('error', 'error', "Internet Error");
                // setLoading(false)
            })
    }


    function cameraUplaod() {
        var x = alertRef;
        setLoading(true)
        update_dp_2(1, userData.token, "public_image")
            .then(data => {
                setLoading(false)
                console.log('data2 = ')
                console.log(data)
                if (data.action == "success") {
                    console.log('asd')
                    setLoading(false)
                    setImgsUrlForUpload(data.filename);
                    setImgsUrlToShow(data.url)
                }
                else {
                    setLoading(false)
                    x.alertWithType('error', 'Error', data.error);
                }
            })
            .catch((error) => {
                console.log(error)
                setLoading(false)
                // x.alertWithType('error', 'error', "Internet Error");
                // setLoading(false)
            })
    }

    function gallaryUpload() {

        var x = alertRef;
        setLoading(true)
        update_dp(1, userData.token, "public_image")
            .then(data => {
                setLoading(false)
                console.log('data2 = ')
                console.log(data)

                if (data.action == "success") {
                    console.log('asd')
                    setLoading(false)
                    setImgsUrlForUpload(data.filename);
                    setImgsUrlToShow(data.url)
                }
                else {
                    setLoading(false)
                    x.alertWithType('error', 'Error', data.error);
                }
            })
            .catch((error) => {
                setLoading(false)
                x.alertWithType('error', 'error', "Internet Error");
                // setLoading(false)
            })
    }

    function next() {
        retrieveItem('login_data')
            .then(data1 => {
                const reqObj = {
                    sal_profile_pic: imgsUrlForUploadP,
                    sal_pic: imgsUrlForUpload,
                    token: data1.token,
                    step: 7,

                }
                setLoading(true)
                apiRequest(reqObj, 'update_salon')
                    .then(data => {
                        setLoading(false)
                        if (data.action == 'success') {
                            console.log(data)
                            storeItem('login_data', data.data)
                                .then(data => {
                                    navigate('AddServices')
                                })
                            // navigate('AddServices')
                        }
                        else {
                            console.log(data)
                            setLoading(false)
                        }

                    })
                    .catch(err => {
                        setLoading(false)
                        console.log(err)
                    })
            })

    }


    return (
        <View style={{ flex: 1, backgroundColor: '#111111' }}>
            <StatusBar
                style="light"
                backgroundColor="#111111"
                translucent={false}
            />
            {loading && <Loader />}
            <DropdownAlert ref={(ref) => alertRef = ref} />
            <SafeAreaView style={{ marginTop: 10, width: "90%", alignSelf: 'center' }}>
                <OnBoardingHeader title="Show off Your Workspace" />
                <ScrollView>
                    <Text style={{ marginTop: 30, fontFamily: 'ABRe', fontSize: 16, color: acolors.white, marginBottom: 10 }}>Salon profile photo
                        {/* This photo will be displayed on your saloon profile when clients look for you on Couaff */}
                    </Text>
                    <TouchableOpacity
                        onPress={() => {
                            Alert.alert(
                                "Upload Picture",
                                'How do you want to upload picture?',

                                [
                                    { text: 'Camera', onPress: () => cameraUplaodP() },

                                    { text: 'Gallery', onPress: () => gallaryUploadP() },
                                ],
                                { cancelable: true },
                            );
                        }}
                        style={{ marginTop: 10, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.1)', width: 120, borderRadius: 60, height: 120, alignItems: 'center', justifyContent: 'center' }}>
                        {imgsUrlToShowP ?
                            <Image
                                onLoad={() => setLoading(false)}
                                onLoadStart={() => setLoading(true)}
                                style={{ width: "100%", height: "100%", borderRadius: 10, }}
                                source={{ uri: imgsUrlToShowP }}
                            /> :
                            <CameraIcon />
                        }
                        <Text style={{ color: 'rgba(255, 255, 255, 0.1)', fontSize: 13, fontFamily: 'ABRe', marginTop: 10 }}>Add profile photo</Text>
                    </TouchableOpacity>
                    <Text style={{ marginTop: 30, fontFamily: 'ABRe', fontSize: 16, color: acolors.white, marginBottom: 10 }}>Salon cover photo
                        {/* This photo will be displayed on your saloon profile when clients look for you on Couaff */}
                    </Text>
                    <TouchableOpacity
                        onPress={() => {
                            Alert.alert(
                                "Upload Picture",
                                'How do you want to upload picture?',

                                [
                                    { text: 'Camera', onPress: () => cameraUplaod() },

                                    { text: 'Gallery', onPress: () => gallaryUpload() },
                                ],
                                { cancelable: true },
                            );
                        }}
                        style={{ marginTop: 10, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.1)', borderStyle: "dashed", width: "100%", borderRadius: 3, height: 187, alignItems: 'center', justifyContent: 'center' }}>
                        {imgsUrlToShow ?
                            <Image
                                onLoad={() => setLoading(false)}
                                onLoadStart={() => setLoading(true)}
                                style={{ width: "100%", height: "100%", borderRadius: 10, }}
                                source={{ uri: imgsUrlToShow }}
                            /> :
                            <CameraIcon />
                        }
                        <Text style={{ color: 'rgba(255, 255, 255, 0.1)', fontSize: 13, fontFamily: 'ABRe', marginTop: 10 }}>Add Workspace photo</Text>
                    </TouchableOpacity>


                </ScrollView>
            </SafeAreaView>
            <MainButton
                disabled={imgsUrlToShow && imgsUrlToShowP ? false : true}
                text="Continue"
                btnStyle={{ position: 'absolute', bottom: 100, width: "90%", alignSelf: 'center' }}
                onPress={() => {
                    next();

                }}
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
