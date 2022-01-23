import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, TextInput, Dimensions } from 'react-native'
import { goBack, navigate } from '../../Navigations';

import { acolors } from '../Components/AppColors';
import CustomTextInput from '../Components/CustomTextInput';
import PrivacyPicker from '../Components/PrivacyPicker';
import { MainButton } from '../Components/Buttons';
import { ArrowForward, ArrowRight, ChatSendIcon, GroupIcon, NotificationIcon, SearchIcon, ArrowLeft, MsgIcon, CallIcon, MailIcon, ArrowRight1, PlusIcon, PlusCircle, PlusIcon1 } from '../Components/Svgs';
import { Entypo } from '@expo/vector-icons';


const ClientProfile = () => {


    const [tabs, setTabs] = useState('appointments')



    const Header = () => (
        <View style={{ width: "100%", flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} >
            <TouchableOpacity
                onPress={() => goBack()}
                style={{ width: 34, height: 34, borderRadius: 34 / 2, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' }}>
                <ArrowLeft />
            </TouchableOpacity>
            <Text style={{ fontFamily: 'ABRe', fontSize: 20.67, color: 'white', marginTop: -15 }}>Client Profile</Text>
            <TouchableOpacity onPress={() => navigate('EditClientsProfile')}>
                <Text style={{ fontFamily: 'ABRe', fontSize: 14.67, color: 'white' }}>Edit</Text>
            </TouchableOpacity>

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
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 0 }}>
                            <View></View>
                            <View>
                                <Image
                                    style={{ width: 99, height: 95, borderRadius: 6.31, }}
                                    source={require('../assets/img3.png')}
                                />
                                <Text style={{ fontFamily: 'ABRe', fontSize: 30.3, color: 'white', alignSelf: 'center', marginTop: 20 }}>Bongani</Text>

                            </View>
                            <View>
                                <TouchableOpacity style={{ width: 28, height: 28, borderRadius: 14, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
                                    <MsgIcon />
                                </TouchableOpacity>
                                <Text style={{ fontFamily: 'ABRe', fontSize: 10.72, color: 'white', alignSelf: 'center', marginTop: 2 }}>Text</Text>
                                <TouchableOpacity style={{ width: 28, height: 28, borderRadius: 14, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', marginTop: 25 }}>
                                    <CallIcon />
                                </TouchableOpacity>
                                <Text style={{ fontFamily: 'ABRe', fontSize: 10.72, color: 'white', alignSelf: 'center', marginTop: 2 }}>Call</Text>
                                <TouchableOpacity style={{ width: 28, height: 28, borderRadius: 14, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', marginTop: 25 }}>
                                    <MailIcon />
                                </TouchableOpacity>
                                <Text style={{ fontFamily: 'ABRe', fontSize: 10.72, color: 'white', alignSelf: 'center', marginTop: 2 }}>Email</Text>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 10 }}>
                            <Text style={{ fontFamily: 'ABRe', fontSize: 12, color: 'white' }}>4 Appointment</Text>
                            <Text style={{ fontFamily: 'ABRe', fontSize: 12, color: 'white' }}>1 Calcellations</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 20, width: "100%" }}>
                        <TouchableOpacity
                            onPress={() => { setTabs('appointments') }}
                            activeOpacity={0.7} style={{ borderBottomWidth: 1, borderColor: tabs == 'appointments' ? acolors.primary : 'white', width: "25%", alignItems: 'center' }}>
                            <Text style={styles.tabsText}>Appointments</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => { setTabs('photos') }}
                            activeOpacity={0.7} style={{ borderBottomWidth: 1, borderColor: tabs == 'photos' ? acolors.primary : 'white', width: "25%", alignItems: 'center' }}>
                            <Text style={styles.tabsText}>Photos</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => { setTabs('about') }}
                            activeOpacity={0.7} style={{ borderBottomWidth: 1, borderColor: tabs == 'about' ? acolors.primary : 'white', width: "25%", alignItems: 'center' }}>
                            <Text style={styles.tabsText}>About Client</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => { setTabs('payments') }}
                            activeOpacity={0.7} style={{ borderBottomWidth: 1, borderColor: tabs == 'payments' ? acolors.primary : 'white', width: "25%", alignItems: 'center' }}>
                            <Text style={styles.tabsText}>Payments</Text>
                        </TouchableOpacity>
                    </View>
                    {
                        tabs == 'appointments' &&
                        [1, 2, 4, 5].map((v, i) => {
                            return (
                                <TouchableOpacity key={i} style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, marginTop: 20, justifyContent: 'space-between' }}>
                                    <View>
                                        <Text style={{ fontFamily: 'ABRe', fontSize: 15.37, color: 'white' }}>09:45 am - 10:00 am</Text>
                                        <Text style={{ fontFamily: 'ABRe', fontSize: 17.85, color: 'white' }}>Mens’s New Hair Cut</Text>
                                    </View>
                                    <Text style={{ fontFamily: 'ABRe', fontSize: 15.97, color: 'white', marginLeft: 30 }}>$90</Text>
                                    <ArrowRight1 />
                                </TouchableOpacity>
                            )
                        })
                    }
                    {
                        tabs == 'photos' &&
                        <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
                            <Image
                                style={{ width: 104, height: 104, borderRadius: 0, resizeMode: 'stretch' }}
                                source={require('../assets/img3.png')}
                            />
                        </View>
                    }
                    {
                        tabs == 'about' &&
                        <View style={{ paddingHorizontal: 20, marginTop: 15, }}>
                            <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between', paddingBottom: 10, paddingHorizontal: 2, borderBottomWidth: 1, borderColor: 'rgba(255,255,255,0.15)', }}>
                                <Text style={{ fontFamily: 'ABRe', fontSize: 14, color: 'white' }}>Clients Notes</Text>
                                <ArrowRight1 />
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 15, justifyContent: 'space-between', paddingBottom: 10, paddingHorizontal: 2, borderBottomWidth: 1, borderColor: 'rgba(255,255,255,0.15)', }}>
                                <Text style={{ fontFamily: 'ABRe', fontSize: 14, color: 'white' }}>Email</Text>
                                <ArrowRight1 />
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 15, justifyContent: 'space-between', paddingBottom: 10, paddingHorizontal: 2, borderBottomWidth: 1, borderColor: 'rgba(255,255,255,0.15)', }}>
                                <Text style={{ fontFamily: 'ABRe', fontSize: 14, color: 'white' }}>Address</Text>
                                <ArrowRight1 />
                            </View>

                        </View>
                    }

                </ScrollView>




            </SafeAreaView>
            <TouchableOpacity
                onPress={() => navigate('NewAppoint')}
                style={{ width: 58, height: 58, borderRadius: 58 / 2, backgroundColor: 'black', alignItems: 'center', justifyContent: 'center', position: 'absolute', right: 20, bottom: 20 }}>
                <Entypo name='plus' size={30} color={"white"} />
            </TouchableOpacity>

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
    },
    tabsText: {
        fontFamily: 'ABRe', fontSize: 12, color: 'white',
        marginBottom: 2
    }
})



export default ClientProfile
