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

var alertRef;

const HealthSafety = () => {


    const [userData, setUserData] = useState({});
    const forceUpdate = useForceUpdate();
    const [loading, setLoading] = useState(false);
    const [packages, setPackages] = useState([]);


    function get_packages() {
        retrieveItem('login_data')
            .then(d => {
                const reqObj = {
                    token: d.token
                }
                setLoading(true)
                apiRequest(reqObj, 'get_health_safety')
                    .then(data => {
                        setLoading(false)
                        if (data.action == 'success') {

                            let arr = data.added;
                            arr = arr.concat(data.data);
                            // arr.push(data.added[0]);
                            console.log(arr)
                            setPackages(arr)
                        }
                        else alertRef.alertWithType('error', 'Error', data.error)
                    })
                    .catch(err => {
                        setLoading(false)
                    })
            })
    }


    function add_sal_health_safety(sr_id, name, del) {
        retrieveItem('login_data')
            .then(d => {
                var reqObj = {};
                if (del) {
                    reqObj = {
                        token: d.token,
                        del_id : sr_id,
                        name
                    }
                }
                else {
                    reqObj = {
                        token: d.token,
                        sr_id,
                        name
                    }
                }

                setLoading(true)
                apiRequest(reqObj, 'add_sal_health_safety')
                    .then(data => {
                        setLoading(false)
                        if (data.action == 'success') {
                            // alertRef.alertWithType('success', 'Success', 'added')
                            get_packages();
                            // setPackages(data.data)
                        }
                        else alertRef.alertWithType('error', 'Error', data.error)
                    })
                    .catch(err => {
                        setLoading(false)
                    })
            })
    }


    useFocusEffect(React.useCallback(() => {
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
            <Text style={{ fontFamily: 'ABRe', fontSize: 20.67, color: 'white' }}>Health & Safety Rules</Text>
            <View></View>
            <View></View>
        </View>
    )



    return (
        <View style={{ flex: 1, backgroundColor: acolors.bgColor }}>
            {loading && <Loader />}
            <DropdownAlert ref={(ref) => alertRef = ref} />
            <SafeAreaView style={{ marginTop: 35, width: "90%", alignSelf: 'center' }}>
                <Header />

                <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between' }}>
                    <FlatList
                        data={packages}
                        contentContainerStyle={{paddingBottom:150}}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => {

                            return (
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10, paddingBottom: 10, width: "100%", paddingVertical: 10, borderBottomWidth: 1, borderColor: 'rgba(255,255,255,0.5)', paddingHorizontal: 0 }}>
                                    <TouchableOpacity
                                        style={{ width: "100%" }}
                                        disabled={item.is_subscribed == '1' && true}
                                        onPress={() => {
                                            // if (item.is_added == '0') {
                                            //     let arr = packages.filter((v)=> {
                                            //         if(v.is_added == 1)  return v.value 
                                            //     })

                                            //     // add_sal_health_safety(item.value)
                                            // }  // setExpandList(false) 
                                            // else {
                                            //     add_sal_health_safety(item.value)
                                            // }
                                            // if () {
                                                add_sal_health_safety(item.id, item.name,item.is_added == '0' ? false : true)
                                            // }
                                            // else {

                                            // }


                                        }}
                                    >
                                        <Text style={{ fontFamily: 'ABRe', fontSize: 17, color: '#FCFCFC', textTransform: 'capitalize' }}>{item.name}</Text>
                                        <View
                                            style={{ position: 'absolute', right: 15, top: 0 }}>
                                            {item.is_added == '1' ? <MarkedIcon height={20} width={20} /> : <UnMarkedIcon height={20} width={20} />}
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



export default HealthSafety

