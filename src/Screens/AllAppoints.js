import React, { useState, useEffect } from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, TextInput, Alert, Linking } from 'react-native'
import { ArrowDown, ArrowForward, ArrowLeft, ArrowRight, ChatSendIcon, GroupIcon, NotificationIcon, RattingStarIcon, SearchIcon } from '../Components/Svgs';
import { Entypo } from '@expo/vector-icons';
import { acolors } from '../Components/AppColors';
import { goBack, navigate } from '../../Navigations';
import { StatusBar } from 'expo-status-bar';
import { FlatList } from 'react-native-gesture-handler';

import { useFocusEffect } from '@react-navigation/native';
import { apiRequest } from '../utils/apiCalls';
import { retrieveItem, useForceUpdate, doConsole, sqlDateTimeToJSDate } from '../utils/functions';
import Loader from '../utils/Loader';
import DropdownAlert from 'react-native-dropdownalert';



var alertRef;

const AllAppoints = (props) => {

    const data = props?.route?.params ? props.route.params : null
    const [userData, setUserData] = useState();

    const forceUpdate = useForceUpdate();
    // const { state, setUserGlobal } = useContext(Context);
    const filterFlatListRef = React.useRef();
    const [loading, setLoading] = useState(false);
    const [tabs, setTabs] = useState('pendings');

    const [pendings, setPendings] = useState([]);
    const [scheduled, setScheduled] = useState([]);
    const [cancelled, setCancelled] = useState([]);
    const [completed, setCompleted] = useState([]);
    const [isDoneScrolling, setIsDoneScrolling] = useState(false);
    let renderConfirmBtn;
    let renderCompleteBtn
    // const [pendings, setPendings] = useState(data ? data[0]?.pendings : []);
    // const [scheduled, setScheduled] = useState(data ? data[0]?.scheduled : []);
    // const [cancelled, setCancelled] = useState(data ? data[0]?.cancelled : []);
    // const [completed, setCompleted] = useState(data ? data[0]?.completed : []);

    const [greaterFromToday, setGreaterFromToday] = useState(false);

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
                            get_all_appoints(d.token)
                            // get_sal_appoints(dataParam.app_date, d.token)
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

        setLoading(true)
        const reqObj = {
            token,
            app_date: app_date
        }
        apiRequest(reqObj, 'get_sal_appoints')
            .then(data1 => {
                setLoading(false)
                if (data1.action == 'success') {
                    let item = data1.data;
                    let pendings = item.filter(item => item.app_status == ('pending' || 'reschedule'));
                    let scheduled = item.filter(item => item.app_status == 'scheduled')
                    let cancelled = item.filter(item => item.app_status == ('cancelled' || 'rejected'))
                    let completed = item.filter(item => item.app_status == 'completed' || item.app_status == 'completed & reviewed')
                    setPendings(pendings);
                    setScheduled(scheduled);
                    setCancelled(cancelled);
                    setCompleted(completed);
                    setTabs(props.route.params.date ? 'pendings' : 'completed');
                }
                else {
                    alertRef.alertWithType("error", "Error", data.error);
                }

            })
            .catch(err => {
                setLoading(false)
            })


    }


    function get_all_appoints(token, id) {

        setLoading(true);
        const reqObj = { token }
        apiRequest(reqObj, 'get_all_appoints')
            .then(data1 => {
                setLoading(false)
                if (data1.action == 'success') {
                    let item = data1.data;
                    let pendings = item.filter(item => item.app_status == 'pending' || item.app_status == 'reschedule');
                    let scheduled = item.filter(item => item.app_status == 'scheduled')
                    let cancelled = item.filter(item => item.app_status == 'cancelled' || item.app_status == 'rejected')
                    let completed = item.filter(item => item.app_status == 'completed' || item.app_status == 'completed & reviewed')
                    if (id) {
                        for (let key of data1.data) {
                            if (key.app_id == id) {
                                key.toScroll = true;
                                if (key.app_status == 'pending') setTabs('pendings');
                                if (key.app_status == 'scheduled') setTabs('scheduled');
                                if (key.app_status == 'cancelled') setTabs('cancelled');
                                if (key.app_status == 'rejected') setTabs('cancelled');
                                if (key.app_status == 'completed') setTabs('completed');
                                if (key.app_status == 'completed & reviewed') setTabs('completed');
                            }
                        }
                    }

                    setPendings(pendings);
                    setScheduled(scheduled);
                    setCancelled(cancelled);
                    setCompleted(completed);
                }
                else {
                    alertRef.alertWithType("error", "Error", data.error);
                }

            })
            .catch(err => {
                setLoading(false)
            })
    }

    function scrollToIndexNow(index) {
        setIsDoneScrolling(true)
        setTimeout(() => filterFlatListRef.current.scrollToIndex({ index: index || 0 }), 120)

    }

    const getItemLayout = (data, index) => (
        { length: 480, offset: 500 * index, index }
    )



    useEffect(() => {
        if (pendings?.length) {
            let appdate = pendings[0]?.app_date;
            var date = new Date(Date.parse(appdate));
            if (date.getDate() > new Date().getDate()) {
                setGreaterFromToday(true)
                forceUpdate();
            }
        }

    }, [])

    useFocusEffect(React.useCallback(
        () => {
            retrieveItem('login_data')
                .then(data => {

                    const id = props.route?.params?.data?.post_id ?? null
                    console.log('id ==', id)
                    get_all_appoints(data.token, id)
                    // if (props.route.params.date) {
                    //     get_sal_appoints(props.route.params.date, data.token)

                    // }
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
                <Text style={{ fontFamily: 'ABRe', fontSize: 15, color: tabs == 'pendings' ? acolors.bgColor : acolors.primary }}>Pending</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => setTabs('scheduled')}
                style={{ width: "25%", height: 40, alignItems: 'center', justifyContent: 'center', backgroundColor: tabs == 'scheduled' ? acolors.primary : acolors.bgColor, borderRadius: 10 }}>
                <Text style={{ fontFamily: 'ABRe', fontSize: 15, color: tabs == 'scheduled' ? acolors.bgColor : acolors.primary }}>Scheduled</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => setTabs('cancelled')}
                style={{ width: "25%", height: 40, alignItems: 'center', justifyContent: 'center', backgroundColor: tabs == 'cancelled' ? acolors.primary : acolors.bgColor, borderRadius: 10 }}>
                <Text style={{ fontFamily: 'ABRe', fontSize: 15, color: tabs == 'cancelled' ? acolors.bgColor : acolors.primary }}>Canceled</Text>
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

    function removeTime(date) {
        return new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate()
        );
    }

    function checkRenderConfirmBtn(dateTime) {

        var t = dateTime.split(/[- :]/);
        var v = new Date(Date.UTC(t[0], t[1] - 1, t[2], t[3], t[4], t[5] ?? "00"));
        let date = new Date();

        if (v < date) return false;
        else return true;

    }

    function checkRenderCompleteBtn(dateTime) {

        var t = dateTime.split(/[- :]/);
        var v = new Date(Date.UTC(t[0], t[1] - 1, t[2], t[3], t[4], t[5] ?? "00"));
        let date = new Date();
        if (date < v) return false;
        else return true;

    }



    return (
        <View style={{ flex: 1, backgroundColor: acolors.bgColor }}>
            {loading && <Loader />}
            <DropdownAlert ref={(ref) => alertRef = ref} />
            <StatusBar
                style='light'
                backgroundColor={acolors.statusBar}
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
                    ref={filterFlatListRef}
                    getItemLayout={getItemLayout}
                    keyExtractor={(item, index) => item.app_id.toString()}
                    renderItem={({ item, index }) => {
                        item.toScroll && !isDoneScrolling && scrollToIndexNow(index);
                        if (tabs == 'pendings') {
                            let date = item.app_date + " " + item.app_start_time;
                            if (item.app_status == 'reschedule') renderConfirmBtn = false
                            else renderConfirmBtn = checkRenderConfirmBtn(date);
                        }
                        if (tabs == 'scheduled') {
                            let date = item.app_date + " " + item.app_end_time;
                            renderCompleteBtn = checkRenderCompleteBtn(date);
                        }


                        return (
                            <View style={{ paddingBottom: 15, borderBottomWidth: 1, borderWidth: item.toScroll ? 1 : 0, borderColor: item.toScroll ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.1)', marginTop: 5, borderRadius: item.toScroll ? 10 : 0 }}>
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
                                            <Text style={{ fontFamily: 'ABRe', fontSize: 9.22, color: 'white', marginTop: 10, marginBottom: 3,textTransform:'capitalize' }}>Gender: {item.user_gender} </Text>

                                            {item.app_status == 'reschedule' ? <Text style={{ fontFamily: 'ABRe', fontSize: 9.22, color: 'white', marginTop: 5, marginBottom: 3 }}>Status: Reschedule <Text style={{ color: '#40A7BE' }}> (Pending approval from client) </Text> </Text> :
                                                <Text style={{ fontFamily: 'ABRe', fontSize: 9.22, color: 'white', marginTop: 5, marginBottom: 3 }}>Status: {item.app_status}</Text>}
                                            {item.come_to_location == '1' &&
                                                <View style={{}}>
                                                    {/* : Reschedule <Text style={{ color: '#40A7BE' }}> (Pending approval from client) </Text> </Text> : */}
                                                    <Text style={{ fontFamily: 'ABRe', fontSize: 10.22, color: 'white', marginTop: 5, marginBottom: 3 }}>Come to location: <Text style={{ color: '#40A7BE' }}> Yes</Text> </Text>
                                                    <TouchableOpacity
                                                        onPress={() => {
                                                            Linking.openURL(`https://www.google.com/maps/dir/?api=1&origin=&destination=${item?.location_address}`);
                                                        }}
                                                    >
                                                        <Text style={{ fontFamily: 'ABRe', fontSize: 10.22, color: 'white', marginTop: 5, marginBottom: 3 }}>Address:<Text style={{textDecorationLine:'underline'}}>  {item.location_address}</Text></Text>
                                                    </TouchableOpacity>

                                                </View>
                                            }
                                        </View>
                                    </View>
                                    {
                                        tabs == 'pendings' &&
                                        <>
                                            {item.app_status != 'reschedule' && <TouchableOpacity
                                                onPress={() => {
                                                    let makeBookedServices = item.app_services.split(",");
                                                    item.sal_services = userData?.sal_services;
                                                    for (let i = 0; i < userData?.sal_services.length; i++) {
                                                        if (makeBookedServices.includes(userData?.sal_services[i].s_name)) {
                                                            item.sal_services[i].isAdded = true
                                                        }
                                                    }
                                                    item.status = 'reschedule';
                                                    navigate('SeeAllServices', item)
                                                }}
                                                style={{ alignSelf: 'center', width: "21%", height: 26, marginLeft: 10, borderRadius: 28, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'white', }}>
                                                <Text style={{ fontFamily: 'ABRe', fontSize: 9.24, color: 'white', }}>Reschedule</Text>
                                            </TouchableOpacity>
                                            }
                                            {
                                                // !greaterFromToday &&
                                                renderConfirmBtn &&
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        confirm_app(item.app_id)
                                                    }}
                                                    style={{ alignSelf: 'center', width: "21%", marginLeft: 10, height: 26, borderRadius: 28, alignItems: 'center', justifyContent: 'center', backgroundColor: acolors.primary }}>
                                                    <Text style={{ fontFamily: 'ABRe', fontSize: 9.24, color: '#000000', }}>Confirm</Text>
                                                </TouchableOpacity>
                                            }
                                        </>
                                    }
                                    {
                                        tabs == 'scheduled' &&
                                        <View style={{ flexDirection: 'row', width: "100%" }}>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    let makeBookedServices = item.app_services.split(",");
                                                    item.sal_services = userData?.sal_services;
                                                    for (let i = 0; i < userData?.sal_services.length; i++) {
                                                        if (makeBookedServices.includes(userData?.sal_services[i].s_name)) {
                                                            item.sal_services[i].isAdded = true
                                                        }
                                                    }
                                                    item.status = 'reschedule';
                                                    navigate('SeeAllServices', item)
                                                }}
                                                style={{ alignSelf: 'center', width: "21%", height: 26, marginLeft: 10, borderRadius: 28, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'white', }}>
                                                <Text style={{ fontFamily: 'ABRe', fontSize: 9.24, color: 'white', }}>Reschedule</Text>
                                            </TouchableOpacity>
                                            {renderCompleteBtn &&
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        complete_app(item)
                                                    }}
                                                    style={{ alignSelf: 'center', width: "21%", marginLeft: 10, height: 26, borderRadius: 28, alignItems: 'center', justifyContent: 'center', backgroundColor: acolors.primary }}>
                                                    <Text style={{ fontFamily: 'ABRe', fontSize: 9.24, color: '#000000', }}>Completed</Text>
                                                </TouchableOpacity>
                                            }
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
                        )
                    }}
                />





            </SafeAreaView>
        </View>
    )
}

export default AllAppoints
