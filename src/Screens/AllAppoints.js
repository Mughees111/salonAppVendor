import React, { useState, useEffect } from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, TextInput, Alert } from 'react-native'
import { ArrowDown, ArrowForward, ArrowLeft, ArrowRight, ChatSendIcon, GroupIcon, NotificationIcon, SearchIcon } from '../Components/Svgs';
import { Entypo } from '@expo/vector-icons';
import { acolors } from '../Components/AppColors';
import { goBack, navigate } from '../../Navigations';
import { StatusBar } from 'expo-status-bar';
import { FlatList } from 'react-native-gesture-handler';

import { useFocusEffect } from '@react-navigation/native';
import { apiRequest } from '../utils/apiCalls';
import { retrieveItem, useForceUpdate, doConsole } from '../utils/functions';
import Loader from '../utils/Loader';
import DropdownAlert from 'react-native-dropdownalert';

var alertRef;

const AllAppoints = (props) => {

    const [data, setData] = useState(props?.route?.params ? props.route.params : null)
    const [userData, setUserData] = useState();

    const forceUpdate = useForceUpdate();
    // const { state, setUserGlobal } = useContext(Context);
    const [loading, setLoading] = useState(false);
    const [tabs, setTabs] = useState('pendings');


    function confirm_app(app_id) {

        if (!app_id) {
            alert.alertWithType("error", "Error", 'Error while cancelling, Please try again later');
            return
        }
        setLoading(true)
        retrieveItem('login_data')
            .then(d => {
                apiRequest({ token: d.token, app_id: app_id }, 'confirm_app')
                    .then(data => {
                        setLoading(false)
                        if (data.action == 'success') {
                            alertRef.alertWithType("success", "Success");
                            setTimeout(() => {
                                goBack();
                            }, 600);
                            // let arr = data;
                            // let index = arr.findIndex(app_id)
                            // arr.splice(index, 1)
                            // setData(arr);
                            forceUpdate();
                        }
                        else {
                            alertRef.alertWithType("error", "Error", data.error);
                        }

                    })
                    .catch(err => {
                        setLoading(false)
                    })
            })


    }

    useFocusEffect(React.useCallback(
        () => {
            retrieveItem('login_data')
                .then(data => {
                    setUserData(data)

                })
        },
        [],
    ))


    const Tabs = () => (
        <View style={{ width: "100%", flexDirection: 'row', height: 40, marginTop: 20 }}>
            <TouchableOpacity
                onPress={() => setTabs('pendings')}
                style={{ width: "33%", height: 40, alignItems: 'center', justifyContent: 'center', backgroundColor: tabs == 'pendings' ? acolors.primary : acolors.bgColor, borderRadius: 10 }}>
                <Text style={{ fontFamily: 'ABRe', fontSize: 18, color: tabs == 'pendings' ? acolors.bgColor : acolors.primary }}>Pendings</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => setTabs('scheduled')}
                style={{ width: "33%", height: 40, alignItems: 'center', justifyContent: 'center', backgroundColor: tabs == 'scheduled' ? acolors.primary : acolors.bgColor, borderRadius: 10 }}>
                <Text style={{ fontFamily: 'ABRe', fontSize: 18, color: tabs == 'scheduled' ? acolors.bgColor : acolors.primary }}>Scheduled</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => setTabs('cancelled')}
                style={{ width: "33%", height: 40, alignItems: 'center', justifyContent: 'center', backgroundColor: tabs == 'cancelled' ? acolors.primary : acolors.bgColor, borderRadius: 10 }}>
                <Text style={{ fontFamily: 'ABRe', fontSize: 18, color: tabs == 'cancelled' ? acolors.bgColor : acolors.primary }}>Cancelled</Text>
            </TouchableOpacity>
        </View>
    )


    const ScheduledActions = ({ item }) => (
        <>

        </>
    )


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
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity
                        onPress={() => goBack()}
                        style={{ width: 34, height: 34, borderRadius: 34 / 2, backgroundColor: 'rgba(255,255,255,0.1)', alignItems: 'center', justifyContent: 'center' }}>
                        <ArrowLeft />
                    </TouchableOpacity>
                    <Text style={{ fontFamily: 'ABRe', fontSize: 20.67, color: 'white', alignSelf: 'center' }}>All Appointment</Text>
                    <Text style={{ fontFamily: 'ABRe', fontSize: 20.67, color: 'white', alignSelf: 'center' }}></Text>
                </View>
                <Tabs />
                <FlatList
                    contentContainerStyle={{ paddingBottom: 100 }}
                    data={tabs == 'pendings' ? data[0]?.pendings : tabs == 'scheduled' ? data[0]?.scheduled : tabs == 'cancelled' ? data[0]?.cancelled : null}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => (
                        <View style={{ paddingBottom: 15, borderBottomWidth: 1, borderColor: 'rgba(255,255,255,0.1)', marginTop: 5 }}>
                            <View
                                onPress={() => navigate('ClientProfile')} style={{ flexDirection: 'row', marginTop: 15, width: "100%" }}>
                                <Image
                                    style={{ width: 49, height: 49, borderRadius: 49 / 2 }}
                                    source={{ uri: item.profile_pic }}
                                // require('../assets/img1.png')}
                                />
                                <View style={{ marginLeft: 15 }}>
                                    <Text style={{ fontFamily: "ABRe", fontSize: 12.89, color: 'white', lineHeight: 21, }}>{item?.name}</Text>
                                    <Text style={{ fontFamily: "ABRe", fontSize: 12.89, color: 'white', lineHeight: 21 }}>{item?.email}</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', width: "100%", marginTop: 10 }}>
                                <View style={{ backgroundColor: 'rgba(38, 50, 56, 0.24)', borderRadius: 2, flexDirection: 'row', width: "50%" }}>
                                    <View style={{ height: "100%", width: 10, backgroundColor: "rgba(163, 163, 163, 0.7)", borderTopRightRadius: 6, borderBottomRightRadius: 8 }}></View>
                                    <View style={{ marginLeft: 10 }}>
                                        <Text style={{ fontFamily: 'ABRe', fontSize: 9.22, color: 'white', marginTop: 5 }}>{item?.app_start_time} - {item?.app_end_time} ({item?.app_date})</Text>
                                        <Text style={{ fontFamily: 'ABRe', fontSize: 9.22, color: 'white', marginTop: 10 }}>{item?.app_services}</Text>
                                        <Text style={{ fontFamily: 'ABRe', fontSize: 9.22, color: 'white', marginTop: 10, marginBottom: 3 }}>{item?.is_paid == 1 ? "Paid: $" + item?.app_price : "Cash Appointment"}</Text>
                                    </View>
                                </View>
                                {
                                    tabs == 'pendings' &&
                                    <>
                                        <TouchableOpacity
                                            onPress={() => {
                                                let makeBookedServices = item.app_services.split(",");
                                                item.sal_services = userData?.sal_services;
                                                doConsole(makeBookedServices);
                                                for (let i = 0; i < userData?.sal_services.length; i++) {
                                                    if (makeBookedServices.includes(userData?.sal_services[i].s_name)) {
                                                        item.sal_services[i].isAdded = true
                                                    }
                                                }
                                                navigate('SeeAllServices', item)
                                            }}
                                            style={{ alignSelf: 'center', width: "21%", height: 26, marginLeft: 10, borderRadius: 28, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'white', }}>
                                            <Text style={{ fontFamily: 'ABRe', fontSize: 9.24, color: 'white', }}>Reschedule</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => {
                                                confirm_app(item.app_id)
                                            }}
                                            style={{ alignSelf: 'center', width: "21%", marginLeft: 10, height: 26, borderRadius: 28, alignItems: 'center', justifyContent: 'center', backgroundColor: acolors.primary }}>
                                              <Text style={{ fontFamily: 'ABRe', fontSize: 9.24, color: '#000000', }}>Confirm</Text>
                                        </TouchableOpacity>
                                    </>
                                }
                                {
                                    tabs == 'scheduled' &&
                                    <TouchableOpacity
                                        onPress={() => {
                                            let makeBookedServices = item.app_services.split(",");
                                            item.sal_services = userData?.sal_services;
                                            doConsole(makeBookedServices);
                                            for (let i = 0; i < userData?.sal_services.length; i++) {
                                                if (makeBookedServices.includes(userData?.sal_services[i].s_name)) {
                                                    item.sal_services[i].isAdded = true
                                                }
                                            }
                                            navigate('SeeAllServices', item)

                                        }}
                                        style={{ alignSelf: 'center', width: "21%", height: 26, marginLeft: 10, borderRadius: 28, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'white', }}>
                                        <Text style={{ fontFamily: 'ABRe', fontSize: 9.24, color: 'white', }}>Reschedule</Text>
                                    </TouchableOpacity>
                                }


                            </View>
                        </View>
                    )}
                />





            </SafeAreaView>
        </View>
    )
}

export default AllAppoints
