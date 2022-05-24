import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Switch } from 'react-native'
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
import { retrieveItem, useForceUpdate, doConsole, storeItem } from '../utils/functions';
import Loader from '../utils/Loader';
import DropdownAlert from 'react-native-dropdownalert';

var alertRef;



const BookingSettings = () => {


    const [tabs, setTabs] = useState('list')
    const [logoutModal, setLogoutModal] = useState(false)
    const [isEnabled, setIsEnabled] = useState(true)

    const [auto_app_accept, setauto_app_accept] = useState('')
    const [userData, setUserData] = useState({});
    const forceUpdate = useForceUpdate();
    const [loading, setLoading] = useState(false);




    const settingsArr = [
        {
            title: "Automatically confirm bookings",
            desc: "When you turn on automatic confirmations,you save time and make it easier for your clients to book",
            navigateTo: "NotificationsS",
        },
        // { title: "Avoid gaps between services", desc: "Schedule Optimization adjusts your available time slots to remove gaps in your calender", navigateTo: "Language" },
    ]

    const LogoutModal = () => (
        <RNModal
            backdropColor='rgba(196, 196, 196, 0.3)'
            isVisible={logoutModal}
            onBackdropPress={() => setLogoutModal(false)}
            style={{ position: 'absolute', bottom: 0, width: "80%", alignSelf: 'center' }}
        >
            <View style={{ backgroundColor: acolors.bgColor, alignItems: 'center', justifyContent: 'center', borderRadius: 10, paddingVertical: 20, paddingHorizontal: 25 }}>
                <Text style={{ fontSize: 20, color: '#FFFFFF', fontFamily: 'ABRe' }}>Logout from the App?</Text>
                <MainButton
                    text={"YES. LOG OUT"}
                    btnStyle={{ marginTop: 20 }}
                    textStyle={{ fontSize: 11.94 }}


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
            <Text style={{ fontFamily: 'ABRe', fontSize: 20.67, color: 'white' }}>Booking Settings</Text>
            <View></View>
        </View>
    )


    useEffect(() => {
        setLoading(true)
        retrieveItem('login_data')
            .then(d => {
                setUserData(d)
                setauto_app_accept(d.auto_app_accept);
                forceUpdate();
                setLoading(false)
            })


    }, []);





    return (
        <View style={{ flex: 1, backgroundColor: acolors.bgColor }}>
            {loading && <Loader />}
            <DropdownAlert ref={(ref) => alertRef = ref} />
            <SafeAreaView style={{ marginTop: 35, width: "90%", alignSelf: 'center' }}>


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
                                    key={i} style={{ flexDirection: 'row', width: "100%", justifyContent: 'space-between', alignItems: 'center', marginTop: 15, width: "100%", paddingBottom: 20, borderBottomWidth: 1, borderColor: 'rgba(255, 255, 255, 0.1)' }}>
                                    <View style={{ marginLeft: 15, width: "80%" }}>
                                        <Text style={{ fontFamily: "ABRe", fontSize: 15.37, color: 'white', lineHeight: 21, }}>{v.title}</Text>
                                        <Text style={{ fontFamily: "ABRe", fontSize: 12.89, color: 'rgba(255,255,255,0.8)', lineHeight: 21, }}>{v.desc}</Text>
                                    </View>

                                    <Switch
                                        trackColor={{ false: "white", true: 'grey' }}
                                        thumbColor={auto_app_accept == '1' ? acolors.primary : "grey"}
                                        ios_backgroundColor="#3e3e3e"
                                        onValueChange={() => {
                                            const reqObj = {
                                                token: userData.token,
                                                auto_app_accept: auto_app_accept == '0' ? '1' : '0'
                                            }
                                            console.log(reqObj)
                                            setLoading(true)
                                            apiRequest(reqObj, 'change_auto_app_accept')
                                                .then(data => {
                                                    console.log(data)
                                                    setLoading(false)
                                                    if (data.action == 'success') {
                                                        storeItem('login_data', data.data)
                                                        setauto_app_accept(data.data.auto_app_accept)
                                                        forceUpdate();
                                                    }
                                                    else {
                                                        alertRef.alertWithType('error', "Error", data.error)
                                                    }

                                                })
                                                .catch(err => {
                                                    console.log(error)
                                                    setLoading(false)
                                                })


                                        }}
                                        value={auto_app_accept == '1' ? true : false}
                                    />

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



export default BookingSettings

