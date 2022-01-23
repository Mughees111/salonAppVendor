import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, TextInput, Dimensions } from 'react-native'
import { goBack, navigate } from '../../Navigations';

import { acolors } from '../Components/AppColors';
import CustomTextInput from '../Components/CustomTextInput';
import PrivacyPicker from '../Components/PrivacyPicker';
import { MainButton } from '../Components/Buttons';
import { ArrowForward, ArrowRight, ChatSendIcon, GroupIcon, NotificationIcon, SearchIcon, ArrowLeft, MsgIcon, CallIcon, MailIcon, ArrowRight1, PlusIcon, PlusCircle, PlusIcon1, ArrowDown, CameraIcon2, ProfileOutline } from '../Components/Svgs';
import { Entypo } from '@expo/vector-icons';


const EditClientsProfile = () => {

    const Header = () => (
        <View style={{ width: "100%", flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} >
            <TouchableOpacity
                onPress={() => goBack()}
                style={{ width: 34, height: 34, borderRadius: 34 / 2, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' }}>
                <ArrowLeft />
            </TouchableOpacity>
            <Text style={{ fontFamily: 'ABRe', fontSize: 20.67, color: 'white', marginTop: -15 }}>Edit Profile</Text>
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
            <SafeAreaView style={{ marginTop: 10, }}>
                <View style={{ width: "90%", alignSelf: 'center' }}>
                    <Header />
                </View>

                <ScrollView
                    contentContainerStyle={{ paddingBottom: 100 }}
                    style={{ marginTop: 10 }}>
                    <View style={{ width: "90%", alignSelf: 'center' }}>

                        <TouchableOpacity
                            // onPress={() => navigate('ClientProfile')}
                            style={{ width: 99, height: 94, borderRadius: 6, backgroundColor: '#C4C4C4', alignItems: 'center', justifyContent: 'center', marginTop: 15, alignSelf: 'center' }}
                        >
                            <ProfileOutline />
                            <View style={{ position: 'absolute', bottom: -6, right: -6, width: 22, height: 22, borderRadius: 11, backgroundColor: acolors.white, alignItems: 'center', justifyContent: 'center' }}>
                                <CameraIcon2 />
                            </View>
                        </TouchableOpacity>


                        <Text style={{ fontFamily: 'ABRe', fontSize: 14, color: '#FCFCFC', marginTop: 10 }}>Full Name</Text>
                        <CustomTextInput
                            placeholder={""}
                        />
                        <Text style={{ fontFamily: 'ABRe', fontSize: 14, color: '#FCFCFC', marginTop: 10 }}>Email</Text>
                        <CustomTextInput
                            placeholder={""}
                        />
                        <Text style={{ fontFamily: 'ABRe', fontSize: 14, color: '#FCFCFC', marginTop: 10 }}>Phone Number</Text>
                        <CustomTextInput
                            placeholder={""}
                        />
                        <Text style={{ fontFamily: 'ABRe', fontSize: 14, color: '#FCFCFC', marginTop: 10 }}>Address</Text>
                        <CustomTextInput
                            placeholder={""}
                        />
                        <Text style={{ fontFamily: 'ABRe', fontSize: 14, color: '#FCFCFC', marginTop: 10 }}>Client Notes</Text>
                        <TextInput
                            multiline={true}
                            style={{
                                width: "100%",
                                minHeight: 82,
                                borderRadius: 8,
                                borderWidth: 1,
                                borderColor: acolors.white,
                                color: acolors.white,
                                fontFamily: 'ABRe',
                                fontSize: 14,
                                paddingHorizontal: 10,
                                marginTop: 10
                            }}

                        />

                    </View>


                </ScrollView>
            </SafeAreaView>
            <MainButton
                btnStyle={{ position: 'absolute', bottom: 40, width: "90%", alignSelf: 'center' }}
                text={"Save"}
            />
        </View>
    )
}

export default EditClientsProfile
