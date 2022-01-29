import React, { useState, useEffect, useContext } from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, TextInput, Alert } from 'react-native'
import { ArrowDown, ArrowForward, ArrowRight, ChatSendIcon, GroupIcon, NotificationIcon, SearchIcon } from '../Components/Svgs';
import { Entypo } from '@expo/vector-icons';
import { acolors } from '../Components/AppColors';
import { navigate, navigateFromStack } from '../../Navigations';
import { StatusBar } from 'expo-status-bar';
import Calender from '../Components/Calender';

import { useFocusEffect } from '@react-navigation/native';
import { apiRequest } from '../utils/apiCalls';
import { retrieveItem, useForceUpdate, doConsole } from '../utils/functions';
import Loader from '../utils/Loader';
import DropdownAlert from 'react-native-dropdownalert';
import { Context } from '../Context/DataContext';

var alertRef;




const Appointments = () => {


    const forceUpdate = useForceUpdate();
    const { state, setLastDateFetch } = useContext(Context);
    const [loading, setLoading] = useState(false);
    const [myAppoints, setMyAppoints] = useState([]);
    const [appoints, setAppoints] = useState([]);
    const [app_date, setAppDate] = useState();
    const [sal_hours, setSalHours] = useState([])

    const [currentDate, setCurrentDate] = useState('');

    const time_slots = [
        "00:00",
        "00:30",
        "01:00",
        "01:30",
        "02:00",
        "02:30",
        "03:00",
        "03:30",
        "04:00",
        "04:30",
        "05:00",
        "05:30",
        "06:00",
        "06:30",
        "07:00",
        "07:30",
        "08:00",
        "08:30",
        "09:00",
        "09:30",
        "10:00",
        "10:30",
        "11:00",
        "11:30",
        "12:00",
        "12:30",
        "13:00",
        "13:30",
        "14:00",
        "14:30",
        "15:00",
        "15:30",
        "16:00",
        "16:30",
        "17:00",
        "17:30",
        "18:00",
        "18:30",
        "19:00",
        "19:30",
        "20:00",
        "20:30",
        "21:00",
        "21:30",
        "22:00",
        "22:30",
        "23:00",
        "23:30",
    ];

    function get_sal_appoints(date) {
        setLoading(true)
        retrieveItem('login_data')
            .then(data => {
                var date1;
                if (!date) {
                    date = new Date();
                }


                setCurrentDate(date);
                let day = date.getDay();
                
                if (day == 0) day = 6
                else day = day - 1
                let sal_day_hours = data.sal_hours[day];
                if (sal_day_hours) {
                    var sal_start_time = time_slots.indexOf(sal_day_hours[0]);
                    var sal_end_time = time_slots.indexOf(sal_day_hours[1]);
                }
                
                var temp = []; // salon_hours
                let j = 0;
                for (let i = parseInt(sal_start_time); i <= parseInt(sal_end_time); i++) {
                    temp[j] = time_slots[i];
                    j++;
                }

                setSalHours(temp)
                forceUpdate();
                setLastDateFetch(date)
                date1 = date.getFullYear() + "-" + date.getMonth() + 1 + "-" + date.getDate()
                const reqObj = {
                    token: data.token,
                    app_date: date1
                }
                if (!temp[0]) {
                    // Alert.alert('asd')
                    setLoading(false)
                    setMyAppoints([]);
                    return
                }
                apiRequest(reqObj, 'get_sal_appoints')
                    .then(data1 => {
                        setLoading(false)
                        if (data1.action == 'success') {

                            setAppoints(data1.data)
                            forceUpdate();
                            makeAppointsB(data1.data, temp)
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


    function makeAppointsB(data, salHours) {

        var data1 = [];
        var final = [];
        var myAppointsLocal = [];
        var salHours1 = [];

        if (data) {
            data1 = data
        }
        else data1 = appoints;

        if (salHours) {
            salHours1 = salHours
        }
        else salHours = sal_hours;

        for (let i = 0; i < salHours.length; i++) {
            for (let j = 0; j < data1.length; j++) {
                if (salHours[i] == data1[j].app_start_time) {
                    if (data1[j].app_status != 'cancelled') {
                        myAppointsLocal.push({
                            maxHeight: (Math.ceil(data1[j].app_est_duration / 30) * 30),
                            minHeight: parseInt(data1[j].app_est_duration),
                            backgroundColor: data1[j].app_status == 'pending' ? "#FFB6B6" : '#BCFFB6',
                            backgroundColor1: data1[j].app_status == 'pending' ? "#FF0000" : '#24FF00',
                            ...data1[j]

                        })
                    }
                    // booked array object
                    // forceUpdate()
                }
            }
        }
        doConsole('t,emp')
        var temp = myAppointsLocal;
        // doConsole(temp)

        for (let i = 0; i < myAppointsLocal.length; i++) {
            if (i == 0 && myAppointsLocal[i].app_start_time != salHours[0]) {
                let getFirstSlot = myAppointsLocal[i].app_slots.split(',')
                let index = time_slots.indexOf(salHours[0]);
                index = parseInt(getFirstSlot[0]) - parseInt(index);
                let addTimeInFirst = (parseInt(index * 30) - 30);
                final.push({
                    maxHeight: addTimeInFirst,
                    minHeight: addTimeInFirst,
                    backgroundColor: acolors.bgColor,
                });
            }

            var time1 = new Date("January 31, 2022 " + myAppointsLocal[i].app_end_time)
            var time2 = new Date("January 31, 2022 " + temp[i + 1]?.app_start_time)


            var temp1 = time1?.getMinutes();
            var temp2 = time2.getMinutes();
            if (temp1 > 0 && temp1 < 30) {
                time1.setMinutes(30)
            }
            else if (temp1 > 30 && temp1 != 0) {
                time1.setHours(time1.getHours() + 1);
                time1.setMinutes(0);    // reset the minutes also
            }

            var diff = (time2 - time1) / 1000;
            diff /= 60;
            console.log('diff')
            console.log(diff)
            final.push(myAppointsLocal[i]);
            if (diff > 0) {
                final.push({
                    maxHeight: diff,
                    minHeight: diff,
                    backgroundColor: acolors.bgColor,
                });
            }
        }
        setMyAppoints(final)
        forceUpdate();
    }


    useFocusEffect(React.useCallback(() => {
        get_sal_appoints()
    }, []))

    // useEffect(() => {
    //     // makeAppointsB()


    // }, []);





    const Header = () => (
        <View style={{ width: "100%", flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} >
            <StatusBar
                style="light"
                backgroundColor="#111111"
                translucent={false}
            />

            <TouchableOpacity onPress={() => navigate('Notifications')}>
                <NotificationIcon />
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {/* <Text style={{ fontFamily: 'ABRe', fontSize: 20.67, color: 'white' }}>Today</Text> */}
                {/* <ArrowDown style={{ marginLeft: 10 }} /> */}
            </View>
            <TouchableOpacity
                onPress={() => {
                    setLoading(true);
                    // let arr = appoints;
                    let arr1 = [];
                    let pendings = appoints.filter(item => item.app_status == 'pending');
                    let scheduled = appoints.filter(item => item.app_status == 'scheduled')
                    let cancelled = appoints.filter(item => item.app_status == 'cancelled')

                    arr1.push({ pendings, scheduled, cancelled })
                    setLoading(false)
                    navigate('AllAppoints', arr1);
                }}
            >
                <Text style={{ fontFamily: 'ABRe', fontSize: 14.67, color: 'white' }}>See All</Text>
            </TouchableOpacity>

        </View>
    )



    return (
        <View style={{ flex: 1, backgroundColor: acolors.bgColor }}>
            {loading && <Loader />}
            <DropdownAlert ref={(ref) => alertRef = ref} />

            <SafeAreaView style={{ marginTop: 35, width: "90%", alignSelf: 'center' }}>
                <Header />
                {/* <Text style={{ fontFamily: 'ABRe', fontSize: 14.67, color: 'white', alignSelf: 'center', marginTop: 5 }}>10:00 am - 7:00 pm     </Text> */}

                <Calender
                    onDayPress={(v) => {
                        // doConsole('v = ')
                        // doConsole(v)
                        get_sal_appoints(v)
                        // setAppDate(v)
                    }}
                />
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 1000 }} >
                    <View style={{ marginTop: 30, width: "100%", height: "100%", }}>

                        <View style={{ flex: 1, }}>
                            {
                                myAppoints?.map((v, i) => {
                                    return (
                                        <TouchableOpacity
                                            key={i}
                                            onPress={() => {
                                                if (v.app_status == 'pending') {
                                                    let arr = myAppoints;
                                                    let pendings = arr.filter(item => item.app_status == 'pending');
                                                    navigate('PendingAppoint', pendings);
                                                }
                                                else navigate('Confirmed', v)
                                            }}
                                            style={{
                                                marginLeft: 45, width: "100%", alignItems: 'center',
                                                alignSelf: 'center',
                                                // marginTop: 0.5,
                                                height: v.maxHeight,

                                            }}
                                        >

                                            <View style={{
                                                backgroundColor: v.backgroundColor,
                                                height: v.minHeight,
                                                width: "90%",
                                                borderTopRightRadius: 10,
                                                borderBottomRightRadius: 10,
                                                flexDirection: 'row'
                                            }}>
                                                <View style={{ width: "5%", height: v.minHeight, borderTopRightRadius: 10, borderBottomRightRadius: 10, backgroundColor: v.backgroundColor1 }}>
                                                </View>
                                                <View style={{ marginLeft: 10, alignSelf: 'center' }}>
                                                    <Text style={{ color: '#111111', fontFamily: 'ABRe', fontSize: 8, }}>{v.app_start_time} - {v.app_end_time}</Text>
                                                    <Text style={{ color: '#111111', fontFamily: 'ABRe', fontSize: 8, }}>{v.app_services}</Text>
                                                    {/* <Text style={{ fontFamily: 'ABRe', fontSize: 9.22, color: 'white', marginTop: 10 }}>{v?.is_paid == 1 ? "Paid: " + v?.app_price : "Cash Appointment"}</Text> */}
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </View>
                        <View style={{ position: 'absolute', alignSelf: 'center' }}>

                            {sal_hours[0] ?
                                sal_hours.map((v, i) => {
                                    return (
                                        <View
                                            key={i}
                                            style={{ width: "100%", flexDirection: 'row', height: 30 }}>
                                            <Text style={{ fontFamily: 'ABRe', fontSize: 9, marginTop: -3, color: '#FCFCFC', width: 35, textAlign: 'right', alignSelf: 'flex-start', }}>{v}</Text>
                                            <View style={{ alignSelf: 'flex-start', marginTop: 0, width: "90%", height: 1, borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)', borderStyle: 'dashed', marginLeft: 10, borderRadius: 1, }}></View>
                                        </View>
                                    )
                                })
                                : <Text style={{ color: 'white', fontFamily: 'ABRe', fontSize: 22, textAlign: 'center', marginTop: 30, alignSelf: 'center' }}>Closed</Text>
                            }
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView >
            <TouchableOpacity
                onPress={() => {
                    navigateFromStack('AddNewClient');
                    // navigate('NewAppoint', props?.route?.params)
                }}
                style={{ width: 58, height: 58, borderRadius: 58 / 2, backgroundColor: 'black', alignItems: 'center', justifyContent: 'center', position: 'absolute', right: 20, bottom: 20 }}>
                <Entypo name='plus' size={30} color={"white"} />
            </TouchableOpacity>
        </View >
    )
}

export default Appointments


// const appoints = [
    //     { start_time: "9:00", app_end_time: "12:30", app_est_duration: "210" },
    //     { start_time: "14:00", app_end_time: "15:30", app_est_duration: "90" },
    //     { start_time: "15:30", app_end_time: "16:30", app_est_duration: "60" },
    //     { start_time: "17:00", app_end_time: "17:30", app_est_duration: "30" },
    // ]


// else if (sal_hours[i] <= appoints[j].app_end_time) { }

                // else if (!myAppointsLocal[i]) {
                //     myAppointsLocal[i] = {
                //         maxHeight: 30,
                //         minHeight: 30,
                //         backgroundColor: 'red',
                //         // acolors.bgColor,
                //         startTime: appoints[j].start_time,
                //         app_end_time: appoints[j].app_end_time,
                //         i: i
                //     }
                //     forceUpdate()
                //     // return
                // };