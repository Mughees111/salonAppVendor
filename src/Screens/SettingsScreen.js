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


const SettingsScreen = () => {


    const [tabs, setTabs] = useState('list')

    const settingsArr = [


        { title: "Personal Settings", desc: "Modify your language, set your notification preferences, and switch business profiles ", navigateTo: "PersonalSettings" },
        { title: "Advanced Options", desc: "Access your Booking Settings and adjust Retails Information", navigateTo: "AdvancedSettings" },
        { title: "Subscription & Billing", desc: "Manage your Couaff subscription, view statements, and your payment method", navigateTo: "SubscriptionAndBiiling" },
        { title: "Couaff App", desc: "Access to Couaff’s Terms & Conditions And Privacy Policy", navigateTo: "CauffAppS" }
    ]


    const Header = () => (
        <View style={{ width: "100%", flexDirection: 'row', justifyContent: 'space-between' }} >
            <TouchableOpacity
                onPress={() => goBack()}
                style={{ width: 34, height: 34, borderRadius: 34 / 2, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' }}>
                <ArrowLeft />
            </TouchableOpacity>
            <Text style={{ fontFamily: 'ABRe', fontSize: 20.67, color: 'white' }}>Settings</Text>
            <TouchableOpacity>
                <VerticalDots />
            </TouchableOpacity>
        </View>
    )


    




    return (
        <View style={{ flex: 1, backgroundColor: acolors.bgColor }}>
            <SafeAreaView style={{ marginTop: 35, width: "90%", alignSelf: 'center' }}>
                <Header />

                <View style={{ width: "100%", height: 42, borderWidth: 1, borderColor: 'white', borderRadius: 8, paddingHorizontal: 10, alignItems: 'center', flexDirection: 'row', marginTop: 20 }}>
                    <TouchableOpacity>
                        <SearchIcon />
                    </TouchableOpacity>
                    <TextInput
                        placeholder='Search in Settings'
                        placeholderTextColor="rgba(252, 252, 252, 1)"
                        returnKeyLabel='Search'
                        enablesReturnKeyAutomatically={true}
                        // onSubmitEditing={() => {
                        //     navigate('SearchScreen')
                        // }}
                        style={{ marginLeft: 10, color: 'rgba(252, 252, 252, 1)', fontFamily: 'ABRe', flex: 1 }}
                    />
                </View>
                <ScrollView
                    // bounces={true}
                    contentContainerStyle={{ paddingBottom: 100 }}
                    style={{ marginTop: 10 }}>
                    {

                        settingsArr.map((v, i) => {
                            return (
                                <TouchableOpacity
                                    onPress={() => navigate(v.navigateTo)}
                                    key={i} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 15, width: "100%", paddingBottom: 20, borderBottomWidth: 1, borderColor: 'rgba(255, 255, 255, 0.1)' }}>
                                    <View style={{ marginLeft: 15 }}>
                                        <Text style={{ fontFamily: "ABRe", fontSize: 15.37, color: 'white', lineHeight: 21, }}>{v.title}</Text>
                                        <Text style={{ fontFamily: "ABRe", fontSize: 12.89, color: 'rgba(255,255,255,0.6)', lineHeight: 21, }}>{v.desc}</Text>
                                    </View>
                                    <ArrowRight1 style={{}} />
                                </TouchableOpacity>
                            )
                        })
                    }

                </ScrollView>




            </SafeAreaView>

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



export default SettingsScreen

