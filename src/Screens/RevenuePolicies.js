import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Switch } from 'react-native'
import { goBack, navigate } from '../../Navigations';

import { acolors } from '../Components/AppColors';
import CustomTextInput from '../Components/CustomTextInput';
import PrivacyPicker from '../Components/PrivacyPicker';
import { MainButton } from '../Components/Buttons';
import { ArrowForward, ArrowRight, ChatSendIcon, GroupIcon, NotificationIcon, SearchIcon, VerticalDots, ArrowRight1, ArrowLeft } from '../Components/Svgs';
import { Entypo } from '@expo/vector-icons';
import RNModal from 'react-native-modal'

import { useFocusEffect } from '@react-navigation/native';
import { apiRequest } from '../utils/apiCalls';
import { retrieveItem, useForceUpdate, doConsole, storeItem } from '../utils/functions';
import Loader from '../utils/Loader';
import DropdownAlert from 'react-native-dropdownalert';
import { urls } from '../utils/Api_urls';

var alertRef;




const RevenuePolicies = () => {


    const [tabs, setTabs] = useState('list')
    const [isEnabled, setIsEnabled] = useState(false)


    const [mobile_pay, setmobile_pay] = useState('')
    const [userData, setUserData] = useState({});
    const forceUpdate = useForceUpdate();
    const [loading, setLoading] = useState(false);



    const settingsArr = [
        { title: "Enable/Disable Mobile Pay", desc: "Allow your clients to pay directly through the app", navigateTo: "", switch: true },
        { title: "Setup Cancelation Pay", desc: "Protect yourself from last minute cancellations", navigateTo: "" },
    ]



    const Header = () => (
        <View style={{ width: "100%", flexDirection: 'row', justifyContent: 'space-between' }} >
            <TouchableOpacity
                onPress={() => goBack()}
                style={{ width: 34, height: 34, borderRadius: 34 / 2, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' }}>
                <ArrowLeft />
            </TouchableOpacity>
            <Text style={{ fontFamily: 'ABRe', fontSize: 20.67, color: 'white' }}>Revenue Policies</Text>
            <View></View>
        </View>
    )


    useEffect(() => {
        setLoading(true)
        retrieveItem('login_data')
            .then(d => {
                setUserData(d)
                setmobile_pay(d.mobile_pay);
                forceUpdate();
                setLoading(false)
            })


    }, []);


    return (
        <View style={{ flex: 1, backgroundColor: acolors.bgColor }}>
            {loading && <Loader />}
            <DropdownAlert ref={(ref) => alertRef = ref} />
            <StatusBar
                style='light'
                backgroundColor={acolors.bgColor}
                translucent={false}
            // translucent={false}
            />
            <SafeAreaView style={{ marginTop: 10, width: "90%", alignSelf: 'center' }}>
                <Header />


                <ScrollView
                    contentContainerStyle={{ paddingBottom: 100 }}
                    style={{ marginTop: 50 }}>
                    {

                        settingsArr.map((v, i) => {
                            return (
                                <TouchableOpacity
                                    onPress={() => {
                                        if (v.navigateTo == 'logout') {
                                            setLogoutModal(true)
                                        }
                                        else navigate(v.navigateTo)
                                    }}
                                    key={i} style={{ flexDirection: 'row', width: "100%", justifyContent: 'space-between', alignItems: 'center', marginTop: 15, width: "100%", paddingBottom: 20, borderBottomWidth: 1, borderColor: 'rgba(255, 255, 255, 0.1)' }}>
                                    <View style={{ marginLeft: 15, width: "80%" }}>
                                        <Text style={{ fontFamily: "ABRe", fontSize: 15.37, color: 'white', lineHeight: 21, }}>{v.title}</Text>
                                        <Text style={{ fontFamily: "ABRe", fontSize: 12.89, color: 'rgba(255,255,255,0.8)', lineHeight: 21, }}>{v.desc}</Text>
                                    </View>
                                    {v.switch &&
                                        <Switch
                                            trackColor={{ false: "white", true: 'grey' }}
                                            thumbColor={mobile_pay == '1' ? acolors.primary : "grey"}
                                            ios_backgroundColor="#3e3e3e"
                                            onValueChange={() => {
                                                const reqObj = {
                                                    token: userData.token,
                                                    mobile_pay_status: mobile_pay == '1' ? '0' : '1'
                                                }
                                                console.log(reqObj)
                                                setLoading(true)
                                                apiRequest(reqObj, 'mobile_pay_status')
                                                    .then(data => {
                                                        console.log(data)
                                                        setLoading(false)
                                                        if (data.action == 'success') {
                                                            storeItem('login_data', data.data)
                                                            setmobile_pay(data.data.mobile_pay)
                                                            forceUpdate();
                                                        }
                                                        else {
                                                            alertRef.alertWithType('error', "Error", data.error)
                                                        }

                                                    })
                                                    .catch(err => {
                                                        alertRef.alertWithType('error', "Error", urls.error)
                                                        console.log(error)
                                                        setLoading(false)
                                                    })


                                            }}
                                            value={mobile_pay == '1' ? true : false}
                                        />
                                    }
                                </TouchableOpacity>
                            )
                        })
                    }

                </ScrollView>




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



export default RevenuePolicies

