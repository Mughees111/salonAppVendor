import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, TextInput } from 'react-native'
import { goBack, navigate } from '../../Navigations';

import { acolors } from '../Components/AppColors';
import CustomTextInput from '../Components/CustomTextInput';
import PrivacyPicker from '../Components/PrivacyPicker';
import { MainButton } from '../Components/Buttons';
import { ArrowForward, ArrowRight, ChatSendIcon, GroupIcon, NotificationIcon, SearchIcon, VerticalDots, ArrowRight1, ArrowLeft } from '../Components/Svgs';
import { Entypo } from '@expo/vector-icons';
import RNModal from 'react-native-modal'

import { useFocusEffect } from '@react-navigation/native';
import { apiRequest } from '../utils/apiCalls';
import {
    retrieveItem, useForceUpdate, doConsole, storeItem
} from '../utils/functions';
import Loader from '../utils/Loader';
import DropdownAlert from 'react-native-dropdownalert';
import { changeLoggedIn } from '../../Common';

var alertRef;


const PersonalSettings = () => {

    const forceUpdate = useForceUpdate();

    const [loading, setLoading] = useState(false);


    const [tabs, setTabs] = useState('list')
    const [logoutModal, setLogoutModal] = useState(false)

    const settingsArr = [
        { title: "Notifications", desc: "Modify your language, set your notification preferences, and switch business profiles ", navigateTo: "NotificationsS" },
        { title: "Language", desc: "Access your Booking Settings and adjust Retails Information", navigateTo: "Language" },
        { title: "Logout", desc: "Access to Couaff’s Terms & Conditions And Privacy Policy", navigateTo: "logout" },
    ]

    const LogoutModal = () => (
        <RNModal
            backdropColor='rgba(196, 196, 196, 0.3)'
            isVisible={logoutModal}
            onBackdropPress={() => setLogoutModal(false)}
            style={{ position: 'absolute', bottom: 0, width: "80%", alignSelf: 'center' }}
        >
            <View style={{ backgroundColor: 'black', alignItems: 'center', justifyContent: 'center', borderRadius: 10, paddingVertical: 20, paddingHorizontal: 25 }}>
                <Text style={{ fontSize: 20, color: '#FFFFFF', fontFamily: 'ABRe' }}>Logout from the App?</Text>
                <MainButton
                    text={"YES. LOG OUT"}
                    btnStyle={{ marginTop: 20 }}
                    textStyle={{ fontSize: 11.94 }}
                    onPress={() => {
                        retrieveItem('login_data')
                            .then(d => {
                                const reqObj = {
                                    token: d.token
                                }
                                setLoading(true)
                                apiRequest(reqObj, 'logout_vendor')
                                    .then(data => {
                                        console.log(data)
                                        setLoading(false)
                                        if (data.action == 'success') {
                                            storeItem('login_data','');
                                            changeLoggedIn.changeNow(2)
                                        }
                                        else {
                                            alertRef.alertWithType("error", "Error", data.error);
                                        }

                                    })
                                    .catch(err => {
                                        setLoading(false)
                                    })
                            })
                    }}


                />
                <TouchableOpacity
                    onPress={() => setLogoutModal(false)}
                    style={{ width: "100%", height: 45, borderRadius: 26, marginTop: 20, borderWidth: 1, borderColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontFamily: 'ABRe', fontSize: 11.94, color: 'white' }}>NOT NOW</Text>
                </TouchableOpacity>
            </View>

        </RNModal>
    )


    const Header = () => (
        <View style={{ width: "100%", flexDirection: 'row', justifyContent: 'space-between' }} >
            <TouchableOpacity
                onPress={() => goBack()}
                style={{ width: 34, height: 34, borderRadius: 34 / 2, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' }}>
                <ArrowLeft />
            </TouchableOpacity>
            <Text style={{ fontFamily: 'ABRe', fontSize: 20.67, color: 'white' }}>Personal Settings</Text>
            <View></View>
        </View>
    )




    return (
        <View style={{ flex: 1, backgroundColor: acolors.bgColor }}>
            <StatusBar
                style='light'
                backgroundColor={acolors.bgColor}
                translucent={false}
            // translucent={false}
            />
            {loading && <Loader />}
            <DropdownAlert ref={(ref) => alertRef = ref} />

            <SafeAreaView style={{ marginTop: 15, width: "90%", alignSelf: 'center' }}>
                <Header />


                <ScrollView
                    contentContainerStyle={{ paddingBottom: 100 }}
                    style={{ marginTop: 50 }}>
                    {

                        settingsArr.map((v, i) => {
                            return (
                                <TouchableOpacity
                                    onPress={() => {
                                        if (v.navigateTo == 'logout') {
                                            setLogoutModal(true)
                                        }
                                        else navigate(v.navigateTo)
                                    }}
                                    key={i} style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15, width: "100%", paddingBottom: 20, borderBottomWidth: 1, borderColor: 'rgba(255, 255, 255, 0.1)' }}>
                                    <View style={{ marginLeft: 15 }}>
                                        <Text style={{ fontFamily: "ABRe", fontSize: 15.37, color: 'white', lineHeight: 21, }}>{v.title}</Text>
                                        {/* <Text style={{ fontFamily: "ABRe", fontSize: 12.89, color: 'rgba(255,255,255,0.6)', lineHeight: 21, }}>{v.desc}</Text> */}
                                    </View>
                                    <ArrowRight1 style={{ position: 'absolute', right: 0, top: 20 }} />
                                </TouchableOpacity>
                            )
                        })
                    }

                </ScrollView>




            </SafeAreaView>
            <LogoutModal />

        </View>
    )
}


const styles = StyleSheet.create({
    activeTab: {
        backgroundColor: acolors.primary,
        width: "50%",
        height: 28,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center'
    },
    inActiveTab: {
        backgroundColor: '#1E1F25',
        // 'rgba(255, 255, 255, 0.1)',
        width: "50%",
        height: 28,
        // borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center'
    },
    activeTabText: {
        fontFamily: 'ABRe',
        fontSize: 16,
        color: '#111111'
    },
    inActiveTabText: {
        fontFamily: 'ABRe',
        fontSize: 14,
        color: '#FFFFFF'
    }
})



export default PersonalSettings

