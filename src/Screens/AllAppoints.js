import React, { useState, useEffect } from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, TextInput, Alert } from 'react-native'
import { ArrowDown, ArrowForward, ArrowLeft, ArrowRight, ChatSendIcon, GroupIcon, NotificationIcon, RattingStarIcon, SearchIcon } from '../Components/Svgs';
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

    const [pendings, setPendings] = useState(data[0]?.pendings);
    const [scheduled, setScheduled] = useState(data[0]?.scheduled);
    const [cancelled, setCancelled] = useState(data[0]?.cancelled);
    const [completed, setCompleted] = useState(data[0]?.completed);


    function confirm_app(app_id) {

        if (!app_id) {
            alertRef.alertWithType("error", "Error", 'Error while cancelling, Please try again later');
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


    function complete_app(dataParam) {

        if (!dataParam.app_id) {
            alertRef.alertWithType("error", "Error", 'Error while updating, Please try again later');
            return
        }
        setLoading(true)
        retrieveItem('login_data')
            .then(d => {
                const reqObj = {
                    token: d.token,
                    app_id: dataParam.app_id,
                    app_status: "completed"
                }
                apiRequest(reqObj, 'complete_app')
                    .then(data => {
                        // setLoading(false)
                        if (data.action == 'success') {
                            get_sal_appoints(dataParam.app_date, d.token)
                            // alertRef.alertWithType("success", "Success");
                            // forceUpdate();
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


    function get_sal_appoints(app_date, token) {

        const reqObj = {
            token,
            app_date: app_date
        }
        doConsole(reqObj)
        apiRequest(reqObj, 'get_sal_appoints')
            .then(data1 => {
                setLoading(false)
                console.log(data1)
                if (data1.action == 'success') {
                    let item = data1.data;
                    let pendings = item.filter(item => item.app_status == 'pending');
                    let scheduled = item.filter(item => item.app_status == 'scheduled')
                    let cancelled = item.filter(item => item.app_status == 'cancelled')
                    let completed = item.filter(item => item.app_status == 'completed' || item.app_status == 'completed & reviewed')
                    setPendings(pendings);
                    setScheduled(scheduled);
                    setCancelled(cancelled);
                    setCompleted(completed);
                    setTabs('completed');

                }
                else {
                    alertRef.alertWithType("error", "Error", data.error);
                }

            })
            .catch(err => {
                setLoading(false)
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
                style={{ width: "25%", height: 40, alignItems: 'center', justifyContent: 'center', backgroundColor: tabs == 'pendings' ? acolors.primary : acolors.bgColor, borderRadius: 10 }}>
                <Text style={{ fontFamily: 'ABRe', fontSize: 15, color: tabs == 'pendings' ? acolors.bgColor : acolors.primary }}>Pendings</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => setTabs('scheduled')}
                style={{ width: "25%", height: 40, alignItems: 'center', justifyContent: 'center', backgroundColor: tabs == 'scheduled' ? acolors.primary : acolors.bgColor, borderRadius: 10 }}>
                <Text style={{ fontFamily: 'ABRe', fontSize: 15, color: tabs == 'scheduled' ? acolors.bgColor : acolors.primary }}>Scheduled</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => setTabs('cancelled')}
                style={{ width: "25%", height: 40, alignItems: 'center', justifyContent: 'center', backgroundColor: tabs == 'cancelled' ? acolors.primary : acolors.bgColor, borderRadius: 10 }}>
                <Text style={{ fontFamily: 'ABRe', fontSize: 15, color: tabs == 'cancelled' ? acolors.bgColor : acolors.primary }}>Cancelled</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => setTabs('completed')}
                style={{ width: "25%", height: 40, alignItems: 'center', justifyContent: 'center', backgroundColor: tabs == 'completed' ? acolors.primary : acolors.bgColor, borderRadius: 10 }}>
                <Text style={{ fontFamily: 'ABRe', fontSize: 15, color: tabs == 'completed' ? acolors.bgColor : acolors.primary }}>Completed</Text>
            </TouchableOpacity>
        </View>
    )


    const MakeReview = ({ number }) => {
        var stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <View>
                    <RattingStarIcon color={i > number ? "grey" : null} />
                </View>
            )
        }
        return <View style={{ flexDirection: 'row' }}>{stars}</View>

    }



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
                    data=
                    {
                        tabs == 'pendings' ? pendings :
                            tabs == 'scheduled' ? scheduled :
                                tabs == 'cancelled' ? cancelled :
                                    tabs == 'completed' ? completed :
                                        null
                    }
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
                                    <View style={{ flexDirection: 'row', width: "100%" }}>
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

                                                complete_app(item)
                                                // confirm_app(item.app_id)
                                            }}
                                            style={{ alignSelf: 'center', width: "21%", marginLeft: 10, height: 26, borderRadius: 28, alignItems: 'center', justifyContent: 'center', backgroundColor: acolors.primary }}>
                                            <Text style={{ fontFamily: 'ABRe', fontSize: 9.24, color: '#000000', }}>Completed</Text>
                                        </TouchableOpacity>

                                    </View>
                                }
                            </View>
                            {
                                tabs == 'completed' &&
                                <View style={{}}>
                                    <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
                                        <Text style={{ fontFamily: 'ABRe', fontSize: 14, color: acolors.primary, marginRight: 5 }}>Rating</Text>
                                        {item.app_rating && <MakeReview number={item.app_rating} />}
                                    </View>
                                    <Text numberOfLines={5} style={{ marginTop: 10, fontFamily: 'ABRe', fontSize: 14, color: 'white' }}><Text style={{ color: acolors.primary }}>Review: </Text>{item.app_review} </Text>
                                </View>

                            }
                        </View>
                    )}
                />





            </SafeAreaView>
        </View>
    )
}

export default AllAppoints
