import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, TextInput, FlatList } from 'react-native'
import { goBack, navigate } from '../../Navigations';

import { acolors } from '../Components/AppColors';
import CustomTextInput from '../Components/CustomTextInput';
import PrivacyPicker from '../Components/PrivacyPicker';
import { MainButton } from '../Components/Buttons';
import { ArrowForward, ArrowRight, ChatSendIcon, GroupIcon, NotificationIcon, SearchIcon, UserProfileIcon, ArrowLeft } from '../Components/Svgs';
import { Entypo } from '@expo/vector-icons';


const Chats = () => {


    const [tabs, setTabs] = useState('list')



    const Header = () => (
        <View style={{ width: "100%", flexDirection: 'row', justifyContent: 'space-between' }} >
            <TouchableOpacity
                onPress={() => goBack()}
                style={{ width: 34, height: 34, borderRadius: 34 / 2, backgroundColor: 'rgba(255,255,255,0.1)', alignItems: 'center', justifyContent: 'center' }}>
                <ArrowLeft />
            </TouchableOpacity>
            <Text style={{ fontFamily: 'ABRe', fontSize: 20.67, color: 'white' }}>Clients</Text>
            <TouchableOpacity
                onPress={() => navigate('MassMsg')}
            >
                <UserProfileIcon />
            </TouchableOpacity>
        </View>
    )


    const chatsArr = [
        { img: require('../assets/img1.png'), name: "Bongani" },
        { img: require('../assets/salonImg1.png'), name: "Bongani" },
        { img: require('../assets/salonImg2.png'), name: "Bongani" },
        { img: require('../assets/salonImg3.png'), name: "Bongani" },
    ]



    return (
        <View style={{ flex: 1, backgroundColor: acolors.bgColor }}>
            <SafeAreaView style={{ marginTop: 35, width: "90%", alignSelf: 'center' }}>
                <Header />
                <View style={{ width: "100%", height: 42, borderWidth: 1, borderColor: 'white', borderRadius: 8, paddingHorizontal: 10, alignItems: 'center', flexDirection: 'row', marginTop: 20 }}>
                    <TouchableOpacity>
                        <SearchIcon />
                    </TouchableOpacity>
                    <TextInput
                        placeholder='Search'
                        placeholderTextColor="rgba(252, 252, 252, 1)"
                        returnKeyLabel='Search'
                        enablesReturnKeyAutomatically={true}
                        // onSubmitEditing={() => {
                        //     navigate('SearchScreen')
                        // }}
                        style={{ marginLeft: 10, color: 'rgba(252, 252, 252, 1)', fontFamily: 'ABRe', flex: 1 }}
                    />

                </View>
                <FlatList
                    data={chatsArr}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            // onPress={() => navigate('ClientProfile')}
                            style={{ flexDirection: 'row', marginTop: 20, width: "100%", paddingBottom: 15, borderBottomWidth: 1, borderColor: 'rgba(255,255,255,0.2)' }}>
                            <Image
                                style={{ width: 49, height: 49, borderRadius: 49 / 2 }}
                                source={item.img}
                            />
                            <View style={{ marginLeft: 15, alignSelf: 'center' }}>
                                <Text style={{ fontFamily: "ABRe", fontSize: 17, color: 'white', lineHeight: 21, }}>{item.name}</Text>
                                <Text style={{ fontFamily: "ABRe", fontSize: 14, color: 'white', lineHeight: 21 }}>Hi Jackson, can you tell …</Text>
                            </View>
                            <View style={{ position: 'absolute', right: 0, alignSelf: 'center', alignItems: 'center' }}>
                                <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: '#00C850', }}></View>
                                <Text style={{ fontFamily: 'ABRe', fontSize: 15, color: 'white', marginTop: 10 }}>Now</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />



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



export default Chats

