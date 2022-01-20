import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, TextInput, Switch } from 'react-native'
import { goBack, navigate } from '../../Navigations';

import { acolors } from '../Components/AppColors';
import CustomTextInput from '../Components/CustomTextInput';
import PrivacyPicker from '../Components/PrivacyPicker';
import { MainButton } from '../Components/Buttons';
import { ArrowForward, ArrowRight, ChatSendIcon, GroupIcon, NotificationIcon, SearchIcon, VerticalDots, ArrowRight1, ArrowLeft } from '../Components/Svgs';



const NotificationsS = () => {


    const [tabs, setTabs] = useState('list')
    const [isEnabled, setIsEnabled] = useState(true)

    const Header = () => (
        <View style={{ width: "100%", flexDirection: 'row', justifyContent: 'space-between' }} >
            <TouchableOpacity
                onPress={() => goBack()}
                style={{ width: 34, height: 34, borderRadius: 34 / 2, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' }}>
                <ArrowLeft />
            </TouchableOpacity>
            <Text style={{ fontFamily: 'ABRe', fontSize: 20.67, color: 'white' }}>Notifications</Text>
            <View></View>
        </View>
    )





    return (
        <View style={{ flex: 1, backgroundColor: acolors.bgColor }}>
            <SafeAreaView style={{ marginTop: 35, width: "90%", alignSelf: 'center' }}>
                <Header />
                <Text style={{ fontFamily: 'ABRe', fontSize: 12.47, color: '#FFFFFF', marginTop: 20 }}>My Notifications</Text>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => setIsEnabled(!isEnabled)}
                style={{ marginTop: 10, backgroundColor: '#262626', alignItems: 'center', justifyContent: 'space-between', padding: 15, borderRadius: 10, flexDirection: 'row' }}>
                <Text style={{ color: 'white', fontFamily: 'ABRe' }}>Send me push notification (this device)</Text>
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

        </SafeAreaView>
            
        </View >
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



export default NotificationsS

