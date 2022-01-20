import React from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, TextInput } from 'react-native'
import { ArrowDown, ArrowForward, ArrowLeft, ArrowRight, ChatSendIcon, GroupIcon, NotificationIcon, SearchIcon } from '../Components/Svgs';
import { Entypo } from '@expo/vector-icons';
import { acolors } from '../Components/AppColors';
import { goBack, navigate } from '../../Navigations';
import { StatusBar } from 'expo-status-bar';
import { FlatList } from 'react-native-gesture-handler';



const PendingAppoint = () => {


    const PendingAppintView = () => (
        <View style={{ paddingBottom: 15, borderBottomWidth: 1, borderColor: 'rgba(255,255,255,0.1)', marginTop: 5 }}>
            <View onPress={() => navigate('ClientProfile')} style={{ flexDirection: 'row', marginTop: 15, width: "100%" }}>
                <Image
                    style={{ width: 49, height: 49, borderRadius: 49 / 2 }}
                    source={require('../assets/img1.png')}
                />
                <View style={{ marginLeft: 15 }}>
                    <Text style={{ fontFamily: "ABRe", fontSize: 12.89, color: 'white', lineHeight: 21, }}>Bongani</Text>
                    <Text style={{ fontFamily: "ABRe", fontSize: 12.89, color: 'white', lineHeight: 21 }}>bongani@gmail.com</Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', width: "100%", marginTop: 10 }}>
                <View style={{ backgroundColor: 'rgba(38, 50, 56, 0.24)', borderRadius: 2, flexDirection: 'row', width: "50%" }}>
                    <View style={{ height: "100%", width: 10, backgroundColor: "rgba(163, 163, 163, 0.7)", borderTopRightRadius: 6, borderBottomRightRadius: 8 }}></View>
                    <View style={{ marginLeft: 10 }}>
                        <Text style={{ fontFamily: 'ABRe', fontSize: 9.22, color: 'white', marginTop: 5 }}>09:45 am - 10:00 am (20-10-2021)</Text>
                        <Text style={{ fontFamily: 'ABRe', fontSize: 9.22, color: 'white', marginTop: 10 }}>Mens’s New Hair Cut</Text>
                    </View>
                </View>
                <TouchableOpacity 
                    onPress={()=>navigate('CancelAppointment')}
                    style={{ alignSelf: 'center', width: "21%", height: 26, marginLeft: 10, borderRadius: 28, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'white', }}>
                    <Text style={{ fontFamily: 'ABRe', fontSize: 9.24, color: 'white', }}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={()=>navigate('Confirmed')}
                    style={{ alignSelf: 'center', width: "21%", marginLeft: 10, height: 26, borderRadius: 28, alignItems: 'center', justifyContent: 'center', backgroundColor: acolors.primary }}>
                    <Text style={{ fontFamily: 'ABRe', fontSize: 9.24, color: '#000000', }}>Confirm</Text>
                </TouchableOpacity>
            </View>
        </View>
    )

    return (
        <View style={{ flex: 1, backgroundColor: acolors.bgColor }}>
            <StatusBar
                style="light"
                backgroundColor="#111111"
            />
            <SafeAreaView style={{ marginTop: 35, width: "90%", alignSelf: 'center' }}>
                <Text style={{ fontFamily: 'ABRe', fontSize: 20.67, color: 'white', alignSelf: 'center' }}>Pending Appointment</Text>
                <TouchableOpacity
                    onPress={() => goBack()}
                    style={{ width: 34, height: 34, borderRadius: 34 / 2, backgroundColor: 'rgba(255,255,255,0.1)', alignItems: 'center', justifyContent: 'center' }}>
                    <ArrowLeft />
                </TouchableOpacity>
                <FlatList
                    contentContainerStyle={{paddingBottom:100}}
                    data={[1, 2, 3, 4, 5]}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => (
                        <PendingAppintView key={index} />
                    )}
                />





            </SafeAreaView>
        </View>
    )
}

export default PendingAppoint
