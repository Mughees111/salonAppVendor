import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Switch } from 'react-native'
import { goBack, navigate } from '../../Navigations';

import { acolors } from '../Components/AppColors';
import CustomTextInput from '../Components/CustomTextInput';
import PrivacyPicker from '../Components/PrivacyPicker';
import { MainButton } from '../Components/Buttons';
import { ArrowForward, ArrowRight, ChatSendIcon, GroupIcon, NotificationIcon, SearchIcon, VerticalDots, ArrowRight1, ArrowLeft } from '../Components/Svgs';
import { Entypo } from '@expo/vector-icons';
import RNModal from 'react-native-modal'


const BookingSettings = () => {


    const [tabs, setTabs] = useState('list')
    const [logoutModal, setLogoutModal] = useState(false)
    const [isEnabled, setIsEnabled] = useState(true)

    const settingsArr = [
        { title: "Automatically confirm bookings", desc: "When you turn on automatic confirmations,you save time and make it easier for your clients to book", navigateTo: "NotificationsS" ,},
        { title: "Avoid gaps between services", desc: "Schedule Optimization adjusts your available time slots to remove gaps in your calender", navigateTo: "Language" },
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




    return (
        <View style={{ flex: 1, backgroundColor: acolors.bgColor }}>
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
                                    key={i} style={{ flexDirection: 'row',width:"100%", justifyContent:'space-between',alignItems: 'center', marginTop: 15, width: "100%", paddingBottom: 20, borderBottomWidth: 1, borderColor: 'rgba(255, 255, 255, 0.1)' }}>
                                    <View style={{ marginLeft: 15,width:"80%" }}>
                                        <Text style={{ fontFamily: "ABRe", fontSize: 15.37, color: 'white', lineHeight: 21, }}>{v.title}</Text>
                                        <Text style={{ fontFamily: "ABRe", fontSize: 12.89, color: 'rgba(255,255,255,0.8)', lineHeight: 21, }}>{v.desc}</Text>
                                    </View>
                                    <Switch
                                        // Platform="ios"
                                        style={{ transform: [{ scaleX: .8 }, { scaleY: .8 }], }}
                                        trackColor={{ false: acolors.bgColor, true: acolors.primary, }}
                                        thumbColor={isEnabled ? acolors.bgColor : 'white'}
                                        ios_backgroundColor={isEnabled ? acolors.bgColor : 'white'}
                                        onValueChange={() => setIsEnabled(!isEnabled)}
                                        value={isEnabled}
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

