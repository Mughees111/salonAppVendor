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


const ProfileLinks = () => {


    const [tabs, setTabs] = useState('list')
    const [logoutModal, setLogoutModal] = useState(false)
    const [isEnabled, setIsEnabled] = useState(true)

    const settingsArr = [
        { title: "Enable/Disable Mobile Pay", desc: "Allow your clients to pay directly through the app", navigateTo: "", switch: true },
        { title: "Setup Cancelation Pay", desc: "Protect yourself from last minute cancellations", navigateTo: "" },
    ]



    const Header = () => (
        <View style={{ width: "100%", flexDirection: 'row', justifyContent: 'space-between' }} >
            <TouchableOpacity
                onPress={() => goBack()}
                style={{ width: 34, height: 34, borderRadius: 34 / 2, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' }}>
                <ArrowLeft />
            </TouchableOpacity>
            <Text style={{ fontFamily: 'ABRe', fontSize: 20.67, color: 'white' }}>Profile Links</Text>
            <View></View>
        </View>
    )




    return (
        <View style={{ flex: 1, backgroundColor: acolors.bgColor }}>
            <SafeAreaView style={{ marginTop: 35, width: "90%", alignSelf: 'center' }}>
                <Header />
                <Text style={{ fontFamily: "ABRe", fontSize: 15.37, color: 'white', lineHeight: 21, marginTop: 30 }}>Setup your profile link</Text>
                <View style={{ flexDirection: 'row', marginTop: 10 ,paddingBottom:20,borderBottomWidth:1,borderColor:'rgba(255,255,255,0.3'}}>
                    <View style={{ width: "80%", height: 29, borderRadius: 10, backgroundColor: '#262626', justifyContent: 'center', paddingHorizontal: 10 }}>
                        <Text style={{ fontSize: 12.52, color: 'white', fontFamily: 'ABRe', }}>www.couaff.com/0hihd039</Text>
                    </View>
                    <TouchableOpacity style={{ width: "18%", marginLeft: 10, height: 29, borderRadius: 10, backgroundColor: '#262626', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10 }}>
                        <Text style={{ fontSize: 12.52, color: 'white', fontFamily: 'ABRe', }}>COPY</Text>
                    </TouchableOpacity>
                </View>
                


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



export default ProfileLinks

