
import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, TextInput, Dimensions } from 'react-native'
import { goBack, navigate } from '../../Navigations';

import { acolors } from '../Components/AppColors';
import CustomTextInput from '../Components/CustomTextInput';
import PrivacyPicker from '../Components/PrivacyPicker';
import { MainButton } from '../Components/Buttons';
import { ArrowForward, ArrowRight, ChatSendIcon, GroupIcon, NotificationIcon, SearchIcon, ArrowLeft, MsgIcon, CallIcon, MailIcon, ArrowRight1, PlusIcon, PlusCircle, PlusIcon1, ArrowDown } from '../Components/Svgs';
import { Entypo } from '@expo/vector-icons';

import { useFocusEffect } from '@react-navigation/native';
import { apiRequest } from '../utils/apiCalls';
import {
    retrieveItem, useForceUpdate, doConsole, storeItem
} from '../utils/functions';
import Loader from '../utils/Loader';
import DropdownAlert from 'react-native-dropdownalert';


const NewAppoint = (props) => {

    const forceUpdate = useForceUpdate();
    const params = props.route.params;
    const [userData, setUserData] = useState()
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

    useFocusEffect(React.useCallback(
        () => {
            retrieveItem('login_data')
                .then(data => {
                    setUserData(data)
                    forceUpdate()
                })
        },
        [],
    ))


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
                            onPress={() => navigate('ClientProfile')}
                            style={{ marginTop: 15, flexDirection: 'row', width: "100%", alignSelf: 'center' }}>
                            <Image
                                style={{ width: 109, height: 109, borderRadius: 109 / 2, }}
                                source={{ uri: params?.profile_pic }}
                            />
                            <View style={{ marginLeft: 25, }}>
                                <Text style={{ fontFamily: "ABRe", fontSize: 16.89, color: 'white', lineHeight: 21, marginTop: 10 }}>{params?.name}</Text>
                                <Text style={{ fontFamily: "ABRe", fontSize: 16.89, color: 'white', lineHeight: 21, marginTop: 10, }}>{params?.email}</Text>
                                <Text style={{ fontFamily: "ABRe", fontSize: 16.89, color: 'white', lineHeight: 21, marginTop: 10, }}>{params?.phone}</Text>
                            </View>
                        </TouchableOpacity>



                        {/* <Text style={{ fontFamily: 'ABRe', fontSize: 14, color: '#FCFCFC', marginTop: 10 }}>Choose Sevice</Text>
                        <View style={{ width: "100%", height: 42, marginTop: 5, borderWidth: 1, borderColor: '#FCFCFC', borderRadius: 8, alignItems: 'center', justifyContent: 'center' }}>
                            
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
                        </TouchableOpacity> */}

                    </View>


                </ScrollView>
            </SafeAreaView>
            <MainButton
                btnStyle={{ position: 'absolute', bottom: 40, width: "90%", alignSelf: 'center' }}
                text={"Next"}
                onPress={() => {
                    userData.user_id = props.route.params.id
                    navigate('SeeAllServices', userData)
                }}
            />
        </View>
    )
}

export default NewAppoint
