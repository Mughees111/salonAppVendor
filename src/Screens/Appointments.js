import React from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, TextInput } from 'react-native'
import { ArrowDown, ArrowForward, ArrowRight, ChatSendIcon, GroupIcon, NotificationIcon, SearchIcon } from '../Components/Svgs';
import { Entypo } from '@expo/vector-icons';
import { acolors } from '../Components/AppColors';
import { navigate } from '../../Navigations';
import { StatusBar } from 'expo-status-bar';



const Appointments = () => {

    const Header = () => (
        <View style={{ width: "100%", flexDirection: 'row', justifyContent: 'space-between' }} >
            <StatusBar
                style="light"
                backgroundColor="#111111"
            />

            <TouchableOpacity onPress={() => navigate('Notifications')}>
                <NotificationIcon />
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontFamily: 'ABRe', fontSize: 20.67, color: 'white' }}>Today</Text>
                <ArrowDown style={{ marginLeft: 10 }} />
            </View>
            <TouchableOpacity
                onPress={() => navigate('PendingAppoint')}
            >
                <Text style={{ fontFamily: 'ABRe', fontSize: 14.67, color: 'white' }}>See All</Text>
            </TouchableOpacity>

        </View>
    )



    return (
        <View style={{ flex: 1, backgroundColor: acolors.bgColor }}>
            <SafeAreaView style={{ marginTop: 35, width: "90%", alignSelf: 'center' }}>
                <Header />
                <Text style={{ fontFamily: 'ABRe', fontSize: 14.67, color: 'white', alignSelf: 'center', marginTop: 5 }}>10:00 am - 7:00 pm     </Text>
                <Text style={{ fontFamily: 'ABRe', fontSize: 20, color: 'white', alignSelf: 'center', marginTop: 35 }}>Calender work is in progress</Text>
                
            </SafeAreaView>
        </View>
    )
}

export default Appointments
