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


const CauffAppS = () => {


    const [tabs, setTabs] = useState('list')
    const [logoutModal, setLogoutModal] = useState(false)

    const settingsArr = [
        { title: "Term of Use", navigateTo: "TermsOfUse" },
        { title: "Privacy Policy",navigateTo: "PrivacyPolicy" },
        { title: "Send Feedback", navigateTo: "SendFeedBack" },
    ]




    const Header = () => (
        <View style={{ width: "100%", flexDirection: 'row', justifyContent: 'space-between' }} >
            <TouchableOpacity
                onPress={() => goBack()}
                style={{ width: 34, height: 34, borderRadius: 34 / 2, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' }}>
                <ArrowLeft />
            </TouchableOpacity>
            <Text style={{ fontFamily: 'ABRe', fontSize: 20.67, color: 'white' }}>Cauaff App</Text>
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
                                    key={i} style={{ flexDirection: 'row',justifyContent:'space-between', alignItems: 'center', marginTop: 15, width: "100%", paddingBottom: 20, borderBottomWidth: 1, borderColor: 'rgba(255, 255, 255, 0.1)' }}>
                                    <View style={{ marginLeft: 15 }}>
                                        <Text style={{ fontFamily: "ABRe", fontSize: 15.37, color: 'white', lineHeight: 21, }}>{v.title}</Text>
                                        {/* <Text style={{ fontFamily: "ABRe", fontSize: 12.89, color: 'rgba(255,255,255,0.6)', lineHeight: 21, }}>{v.desc}</Text> */}
                                    </View>
                                    <ArrowRight1 />
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



export default CauffAppS

