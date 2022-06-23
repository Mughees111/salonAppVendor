import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, FlatList, ScrollView, TextInput } from 'react-native'
import { goBack, navigate } from '../../Navigations';

import { acolors } from '../Components/AppColors';
import CustomTextInput from '../Components/CustomTextInput';
import PrivacyPicker from '../Components/PrivacyPicker';
import { MainButton } from '../Components/Buttons';
import { ArrowForward, ArrowRight, ChatSendIcon, GroupIcon, NotificationIcon, SearchIcon, VerticalDots, ArrowRight1, ArrowLeft, CloseDropDown, ArrowDown, MarkedIcon, UnMarkedIcon } from '../Components/Svgs';
import { Entypo } from '@expo/vector-icons';

import { useFocusEffect } from '@react-navigation/native';
import { apiRequest } from '../utils/apiCalls';
import { retrieveItem, useForceUpdate, doConsole, storeItem } from '../utils/functions';
import Loader from '../utils/Loader';
import DropdownAlert from 'react-native-dropdownalert';
import * as Notifications from 'expo-notifications'

var alertRef;

const SubscriptionAndBiiling = () => {


    const [userData, setUserData] = useState({});
    const forceUpdate = useForceUpdate();
    const [loading, setLoading] = useState(false);
    const [packages, setPackages] = useState([]);

 
    function get_packages() {
        retrieveItem('login_data')
            .then(d => {
                const reqObj = {
                    token: d.token,
                    service : "get_packages"
                }
                setLoading(true)
                apiRequest(reqObj, 'get_packages')
                    .then(data => {
                        // console.log(data)
                        setLoading(false)
                        if (data.action == 'success') {
                            setPackages(data.data)
                        }
                        else alertRef.alertWithType('error', 'Error', data.error)
                    })
                    .catch(err => {
                        setLoading(false)
                    })
            })
    }

    function subscribe_package(id) {
        retrieveItem('login_data')
            .then(d => {
                const reqObj = {
                    token: d.token,
                    sal_id: d.sal_id,
                    id: id
                }
                // console.log(reqObj);
                setLoading(true);
                apiRequest(reqObj, 'subscribe_package')
                    .then(data => {
                        setLoading(false);
                        // console.log(data)
                        if (data.action == 'success') {
                            get_packages();
                            setLoading(false)
                        }
                        else alertRef.alertWithType('error', 'Error', data.error)
                    })
                    .catch(err => {
                        setLoading(false)
                    })
            })
    }

    // async function schedulePushNotification() {
    //     await Notifications.scheduleNotificationAsync({
    //         content: {
    //             title: "You've got mail! 📬",
    //             body: 'Here is the notification body',
    //             data: { data: 'goes here' },
    //         },
    //         trigger: { seconds: 20 },
    //     });
    // }





    useFocusEffect(React.useCallback(() => {
        // console.log('asd')
        // schedulePushNotification();
        get_packages();
        retrieveItem('login_data')
            .then(d => {
                setUserData(d)
                forceUpdate();
            })

    }, []))





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
            {loading && <Loader />}
            <DropdownAlert ref={(ref) => alertRef = ref} />
            <SafeAreaView style={{ marginTop: 35, width: "90%", alignSelf: 'center' }}>
                <Header />
                <Text style={{ fontFamily: "ABRe", fontSize: 14, color: 'white', lineHeight: 21, marginTop: 20 }}>Change your subscription at any time</Text>
                <Text style={{ fontFamily: "ABRe", fontSize: 14, color: 'white', marginTop: 20 }}>Choose Your Plan</Text>
                <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between' }}>
                    <FlatList
                        data={packages}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => {
                            if(item.id == 1 && item.is_subscribed == 0 ) return null
                            return (
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 15, width: "100%", paddingVertical: 10, borderRadius: 8, borderWidth: 1, borderColor: 'rgba(255,255,255,0.5)', paddingHorizontal: 10 }}>
                                    <TouchableOpacity
                                        disabled={item.is_subscribed == '1' || item.id == 1 && true}
                                        style={{ width: "100%" }}
                                        onPress={() => {
                                            if (item.is_subscribed == '0') {
                                                navigate('PaymentMethod1', {
                                                    app_id: item.id,
                                                })
                                                // subscribe_package(item.id)
                                            }  // setExpandList(false)
                                        }}
                                    >
                                        <Text style={{ fontFamily: 'ABRe', fontSize: 17, color: '#FCFCFC', textTransform: 'capitalize' }}>{item.title}</Text>
                                        <Text style={{ fontFamily: 'ABRe', fontSize: 14, color: '#FCFCFC', textTransform: 'capitalize', marginTop: 3 }}>{item.type} (${item.price})</Text>
                                        <Text style={{ fontFamily: 'ABRe', fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 3 }}>{item.description}</Text>
                                        <View
                                            style={{ position: 'absolute', right: 15, top: 15 }}>
                                            {item.is_subscribed == '1' ? <MarkedIcon /> : <UnMarkedIcon />}
                                        </View>
                                    </TouchableOpacity>
                                    {/* {
                                        index == 0 &&
                                        <TouchableOpacity
                                            style={{ width: "100%" }}
                                            onPress={() => { setExpandList(false) }}
                                        >
                                            <CloseDropDown />
                                        </TouchableOpacity>
                                    } */}
                                </View>
                            )
                        }}
                    />
                    {/* <TouchableOpacity
                        disabled={expandList ? true : false}
                        onPress={() => setExpandList(true)}
                        style={{ flexDirection: 'row', width: "100%", paddingVertical: 10, justifyContent: 'space-between', borderWidth: 1, borderColor: 'white', borderRadius: 10, paddingHorizontal: 10 }}>
                        {
                            expandList ?
                                
                                :
                                <>
                                    <Text style={{ fontFamily: 'ABRe', fontSize: 14, color: '#FCFCFC', }}>Owner Only</Text>
                                    <ArrowDown style={{ marginTop: 5 }} />
                                </>

                        }
                    </TouchableOpacity> */}


                </View>

            </SafeAreaView>


            {/* <View style={{ position: 'absolute', bottom: 100, width: "80%", alignSelf: 'center' }}>
                <Text style={{ fontFamily: "ABRe", fontSize: 24, color: 'white', alignSelf: 'flex-end' }}>$30/month</Text>
                <MainButton
                    btnStyle={{ marginTop: 5 }}
                    text={"Subscribe"}
                />
                <Text style={{ fontFamily: "ABRe", fontSize: 14, color: 'white', alignSelf: 'center', marginTop: 20 }}>Terms & Conditions</Text>

            </View> */}



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

