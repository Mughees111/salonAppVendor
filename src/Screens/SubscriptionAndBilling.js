import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, FlatList, ScrollView, TextInput } from 'react-native'
import { goBack, navigate } from '../../Navigations';

import { acolors } from '../Components/AppColors';
import CustomTextInput from '../Components/CustomTextInput';
import PrivacyPicker from '../Components/PrivacyPicker';
import { MainButton } from '../Components/Buttons';
import { ArrowForward, ArrowRight, ChatSendIcon, GroupIcon, NotificationIcon, SearchIcon, VerticalDots, ArrowRight1, ArrowLeft, CloseDropDown, ArrowDown } from '../Components/Svgs';
import { Entypo } from '@expo/vector-icons';


const SubscriptionAndBiiling = () => {

    const [expandList, setExpandList] = useState(false)
    const prices = [
        "Owner Only",
        "Owner + 1 Staffer",
        "Owner + 2 Staffer",
        "Owner + 3 Staffer",

    ];


    const Header = () => (
        <View style={{ width: "100%", flexDirection: 'row', justifyContent: 'space-between' }} >
            <TouchableOpacity
                onPress={() => goBack()}
                style={{ width: 34, height: 34, borderRadius: 34 / 2, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' }}>
                <ArrowLeft />
            </TouchableOpacity>
            <Text style={{ fontFamily: 'ABRe', fontSize: 20.67, color: 'white' }}>Your Subscription</Text>
            <View></View>
        </View>
    )







    return (
        <View style={{ flex: 1, backgroundColor: acolors.bgColor }}>
            <SafeAreaView style={{ marginTop: 35, width: "90%", alignSelf: 'center' }}>
                <Header />
                <Text style={{ fontFamily: "ABRe", fontSize: 14, color: 'white', lineHeight: 21, marginTop: 20 }}>Change your subscription at any time</Text>
                <Text style={{ fontFamily: "ABRe", fontSize: 14, color: 'white', marginTop: 20 }}>Choose Your Plan</Text>
                <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between' }}>
                    <TouchableOpacity
                        disabled={expandList ? true : false}
                        onPress={() => setExpandList(true)}
                        style={{ flexDirection: 'row', width: "100%", paddingVertical: 10, justifyContent: 'space-between', borderWidth: 1, borderColor: 'white', borderRadius: 10, paddingHorizontal: 10 }}>

                        {
                            expandList ?
                                <FlatList
                                    data={prices}
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={({ item, index }) => {
                                        console.log(index)
                                        return (
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 5 }}>
                                                <TouchableOpacity
                                                    style={{ width: "100%" }}
                                                    onPress={() => { setExpandList(false) }}
                                                >
                                                    <Text style={{ fontFamily: 'ABRe', fontSize: 14, color: '#FCFCFC', }}>{item}</Text>
                                                </TouchableOpacity>
                                                {
                                                    index == 0 &&
                                                    <TouchableOpacity
                                                        style={{ width: "100%" }}
                                                        onPress={() => { setExpandList(false) }}
                                                    >
                                                        <CloseDropDown />
                                                    </TouchableOpacity>
                                                }
                                            </View>
                                        )
                                    }}
                                />
                                :
                                <>
                                    <Text style={{ fontFamily: 'ABRe', fontSize: 14, color: '#FCFCFC', }}>Owner Only</Text>
                                    <ArrowDown style={{ marginTop: 5 }} />
                                </>

                        }
                    </TouchableOpacity>


                </View>

            </SafeAreaView>


            <View style={{ position: 'absolute', bottom: 100, width: "80%", alignSelf: 'center' }}>
                <Text style={{ fontFamily: "ABRe", fontSize: 24, color: 'white', alignSelf: 'flex-end' }}>$30/month</Text>
                <MainButton
                    btnStyle={{ marginTop: 5 }}
                    text={"Subscribe"}
                />
                <Text style={{ fontFamily: "ABRe", fontSize: 14, color: 'white', alignSelf: 'center', marginTop: 20 }}>Terms & Conditions</Text>

            </View>



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



export default SubscriptionAndBiiling

