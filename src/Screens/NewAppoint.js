import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, TextInput, Dimensions } from 'react-native'
import { goBack, navigate } from '../../Navigations';

import { acolors } from '../Components/AppColors';
import CustomTextInput from '../Components/CustomTextInput';
import PrivacyPicker from '../Components/PrivacyPicker';
import { MainButton } from '../Components/Buttons';
import { ArrowForward, ArrowRight, ChatSendIcon, GroupIcon, NotificationIcon, SearchIcon, ArrowLeft, MsgIcon, CallIcon, MailIcon, ArrowRight1, PlusIcon, PlusCircle, PlusIcon1, ArrowDown } from '../Components/Svgs';
import { Entypo } from '@expo/vector-icons';


const NewAppoint = () => {

    const Header = () => (
        <View style={{ width: "100%", flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} >
            <TouchableOpacity
                onPress={() => goBack()}
                style={{ width: 34, height: 34, borderRadius: 34 / 2, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' }}>
                <ArrowLeft />
            </TouchableOpacity>
            <Text style={{ fontFamily: 'ABRe', fontSize: 20.67, color: 'white', marginTop: -15 }}>New Appointment</Text>
            <View></View>

        </View>
    )
    return (
        <View style={{ flex: 1, backgroundColor: acolors.bgColor }}>
            <SafeAreaView style={{ marginTop: 35, }}>
                <View style={{ width: "90%", alignSelf: 'center' }}>
                    <Header />
                </View>

                <ScrollView
                    contentContainerStyle={{ paddingBottom: 100 }}
                    style={{ marginTop: 10 }}>
                    <View style={{ width: "90%", alignSelf: 'center' }}>
                        <TouchableOpacity onPress={() => navigate('ClientProfile')} style={{ flexDirection: 'row', marginTop: 15, width: "100%" }}>
                            <Image
                                style={{ width: 49, height: 49, borderRadius: 49 / 2 }}
                                source={require('../assets/img1.png')}
                            />
                            <View style={{ marginLeft: 15 }}>
                                <Text style={{ fontFamily: "ABRe", fontSize: 12.89, color: 'white', lineHeight: 21, }}>Bongani</Text>
                                <Text style={{ fontFamily: "ABRe", fontSize: 12.89, color: 'white', lineHeight: 21 }}>bongani@gmail.com</Text>
                            </View>
                        </TouchableOpacity>


                        <Text style={{ fontFamily: 'ABRe', fontSize: 14, color: '#FCFCFC', marginTop: 10 }}>Choose Sevice</Text>
                        <View style={{ width: "100%", height: 42, marginTop: 5, borderWidth: 1, borderColor: '#FCFCFC', borderRadius: 8, alignItems: 'center', justifyContent: 'center' }}>
                            {/* <Text>92</Text> */}
                            <PrivacyPicker
                                selected={{ title: "Men’s new hair cut" }}
                                data={{ title: "Men’s new hair cut" }, { title: "service 2" }, { title: "service 3" }}
                                onValueChange={(index, title) => {
                                    // setCondition(title.title)
                                }}
                            />
                        </View>
                        <Text style={{ fontFamily: 'ABRe', fontSize: 14, color: '#FCFCFC', marginTop: 10 }}>Date</Text>
                        <TouchableOpacity style={{ width: "100%", paddingHorizontal: 10, height: 42, marginTop: 5, borderWidth: 1, borderColor: '#FCFCFC', borderRadius: 8, alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
                            <Text style={{ fontFamily: 'ABRe', fontSize: 14, color: '#FCFCFC' }}>21-10-2021</Text>
                            <ArrowDown />
                        </TouchableOpacity>
                        <Text style={{ fontFamily: 'ABRe', fontSize: 14, color: '#FCFCFC', marginTop: 10 }}>Time</Text>
                        <TouchableOpacity style={{ width: "100%", paddingHorizontal: 10, height: 42, marginTop: 5, borderWidth: 1, borderColor: '#FCFCFC', borderRadius: 8, alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
                            <Text style={{ fontFamily: 'ABRe', fontSize: 14, color: '#FCFCFC' }}>11:15 am</Text>
                            <ArrowDown />
                        </TouchableOpacity>

                    </View>


                </ScrollView>
            </SafeAreaView>
            <MainButton
                btnStyle={{ position: 'absolute', bottom: 40,width:"90%",alignSelf:'center' }}
                text={"Save"}
            />
        </View>
    )
}

export default NewAppoint
