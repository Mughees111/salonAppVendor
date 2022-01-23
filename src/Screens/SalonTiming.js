import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Dimensions, Modal, Switch, Alert } from 'react-native'
import { goBack, navigate } from '../../Navigations';
import { ArrowLeft, ArrowRight, ArrowRight1, FbIcon, GoogleIcon, PlusCircle } from '../Components/Svgs';
import { acolors } from '../Components/AppColors';
import CustomTextInput from '../Components/CustomTextInput';
import PrivacyPicker from '../Components/PrivacyPicker';
import { MainButton } from '../Components/Buttons';
import { OnBoardingHeader } from '../Components/Header';
import DateTimePicker from '@react-native-community/datetimepicker';
import ReactNativeModal from 'react-native-modal';
import { retrieveItem, storeItem } from "../utils/functions";
import DropdownAlert from 'react-native-dropdownalert';
import { apiRequest, doPost } from '../utils/apiCalls';
import Loader from '../utils/Loader';
import { urls } from '../utils/Api_urls';
import { FlatList } from 'react-native-gesture-handler';
import { TestCode } from './TestCode';

// import DateTimePickerModal from "react-native-modal-datetime-picker";





const useForceUpdate = () => {
    const [, updateState] = React.useState();
    return React.useCallback(() => updateState({}), []);
}

var alertRef;
const SalonTiming = () => {

    const forceUpdate = useForceUpdate();
    const [mode, setMode] = useState('time');
    const [date, setDate] = useState(new Date(1598051730000));
    const [pickerModal, setPickerModal] = useState(false);
    const [pickerModal1, setPickerModal1] = useState(false);
    const [idToSetTime, setIdToSetTime] = useState('');
    const [loading, setLoading] = useState(false)
    const [setSalonTiming, setSetSalonTiming] = useState(false)
    const [salOnOf, setSalOnOf] = useState(true)


    const [salon_hours, setSalonHours] = useState([
        ["00:00", "00:00"],
        ["00:00", "00:00"],
        ["00:00", "00:00"],
        ["00:00", "00:00"],
        ["00:00", "00:00"],
        ["00:00", "00:00"],
        ["00:00", "00:00"],
    ])

    const daysArr = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
    ]




    async function next() {

        // storeItem('login_data',{test:'123'})
        retrieveItem('login_data')
            .then(async (dataa) => {
                var data1 = dataa;
                
                data1.step = 6;
                data1.sal_hours = salon_hours;
                console.log('data i am sending');
                console.log(data1)
                setLoading(true)

                apiRequest(data1, 'salon_signup')
                    .then(data => {
                        setLoading(false)
                        // console.log('console1')
                        console.log('data i get from server');
                        console.log(data)
                        if (data.action == 'success') {
                            alertRef.alertWithType("success", "Success", "");
                            storeItem('login_data', data.data)
                                .then(data => {
                                    navigate('AddSalonPhoto')
                                })
                        }
                        else {
                            alertRef.alertWithType("error", "Error", data.error);
                        }
                    })
                    .catch(err => {
                        console.log('console2')
                        console.log(err)
                        alertRef.alertWithType("error", "Error", "Internet Error");
                        setLoading(false)
                    })


            })




    }



    const DatePickerModel = () => (
    
        <DateTimePicker
            value={new Date(-1232403882588)}
            mode='time'
            // is24Hour={true}
            // display='clock'
            minuteInterval={30}
            themeVariant="dark"
            onChange={(event, date) => {
                if (date) {
                    let arr = salon_hours;
                    let hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
                    let minutes = date.getMinutes() == 0 ? "00" : date.getMinutes();
                    let time = hours + ":" + minutes;
                    if (idToSetTime == 'all') {
                        for (let key in arr) {
                            arr[key][0] = time;
                        }
                        setSalonHours(arr)
                        forceUpdate()
                        setTimeout(() => {
                            setPickerModal1(true)
                        }, 200);
                    }
                    else {
                        arr[idToSetTime][0] = time;
                        setSalonHours(arr)
                        forceUpdate()
                        setPickerModal(false)
                        setSetSalonTiming(true)
                        // setTimeout(() => {
                        // setPickerModal1(true)
                        // }, 100);
                    }

                }
                else setPickerModal(false)

            }}
            style={{ backgroundColor: 'red', color: 'red' }}

        />

     
    )

    const DatePickerModel2 = () => (
        <DateTimePicker
            value={new Date(-1332403882588)}
            mode='time'
            // is24Hour={true}
            // display='clock'
            minuteInterval={30}
            themeVariant="dark"
            onChange={(event, date) => {
                if (date) {
                    var arr = salon_hours;
                    let hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
                    let minutes = date.getMinutes() == 0 ? "00" : date.getMinutes();
                    let time = hours + ":" + minutes;
                    if (idToSetTime == 'all') {
                        for (let key in arr) {
                            arr[key][1] = time;
                        }
                        setSalonHours(arr)
                        forceUpdate()
                        setPickerModal1(false)
                    }
                    else {
                        arr[idToSetTime][1] = time;
                        setSalonHours(arr)
                        forceUpdate()
                        setPickerModal1(false)
                        setSetSalonTiming(true)
                    }
                }
                else {
                    setPickerModal1(false)
                }

            }}
        />
    )



    if (setSalonTiming) {
        return (
            <View style={{ flex: 1, paddingHorizontal: 20, height: Dimensions.get('window').height, width: Dimensions.get('window').width, backgroundColor: '#111111', }}>
                <DropdownAlert ref={(ref) => alertRef = ref} />
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
                    <TouchableOpacity
                        onPress={() => setSetSalonTiming(false)}
                        style={{ width: 34, height: 34, borderRadius: 34 / 2, backgroundColor: 'rgba(255,255,255,0.1)', alignItems: 'center', justifyContent: 'center' }}>
                        <ArrowLeft />
                    </TouchableOpacity>
                    <Text style={{ fontFamily: 'ABRe', fontSize: 16, color: acolors.white }}>{"Your Saloon Hours"}</Text>
                    <Text>          </Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{ marginTop: 30, fontFamily: 'ABRe', fontSize: 16, color: acolors.white, marginBottom: 10 }}>When your clients book with you?</Text>
                    <View style={{ alignItems: 'center' }}>
                        <Switch
                            trackColor={{ false: "white", true: 'grey' }}
                            thumbColor={salon_hours[idToSetTime][0] == 'closed' ? "grey" : acolors.primary}
                            // ios_backgroundColor="#3e3e3e"
                            onValueChange={(v) => {
                                // salon_hours[idToSetTime][0] == 'closed'?
                                // setSalOnOf(!salOnOf)
                                if (salon_hours[idToSetTime][0] == 'closed') {
                                    let arr = salon_hours;
                                    arr[idToSetTime][0] = '';
                                    arr[idToSetTime][1] = '';
                                    setSalonHours(arr)
                                    forceUpdate()
                                }
                                else {
                                    let arr = salon_hours;
                                    arr[idToSetTime][0] = 'closed';
                                    arr[idToSetTime][1] = '';
                                    // console.log(arr)
                                    setSalonHours(arr)
                                    forceUpdate()
                                }
                            }}
                            value={salon_hours[idToSetTime][0] == 'closed' ? false : true}
                        />
                        <Text style={{ fontFamily: 'ABRe', fontSize: 10, color: 'white', marginTop: -9 }}>{salon_hours[idToSetTime][0] == 'closed' ? 'Closed' : "Open"}</Text>
                    </View>
                </View>


                <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 40 }}>
                    <TouchableOpacity
                        disabled={salon_hours[idToSetTime][0] == 'closed' ? true : false}
                        onPress={() => {
                            setSetSalonTiming(false)
                            setPickerModal(true)
                            forceUpdate();
                        }}
                    >
                        <Text style={{ fontFamily: 'ABRe', fontSize: 25, color: acolors.primary }}>{salon_hours[idToSetTime][0] == 'closed' || salon_hours[idToSetTime][0] == '' ? "00:00" : salon_hours[idToSetTime][0]}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        disabled={salon_hours[idToSetTime][0] == 'closed' ? true : false}
                        onPress={() => {
                            setSetSalonTiming(false)
                            setPickerModal1(true)
                            forceUpdate();
                        }}
                    >
                        <Text style={{ fontFamily: 'ABRe', fontSize: 25, color: acolors.primary }}>{salon_hours[idToSetTime][0] == 'closed' || salon_hours[idToSetTime][1] == '' ? "00:00" : salon_hours[idToSetTime][1]}</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ position: 'absolute', bottom: 50, flex: 1, width: "100%", alignSelf: 'center', }}>
                    <MainButton
                        btnStyle={{ alignSelf: 'center' }}
                        text={"Ok"}
                        onPress={() => {
                            // setPickerModal(true);
                            if (salon_hours[idToSetTime][0] == '' || salon_hours[idToSetTime][0] == '00:00') {
                                alertRef.alertWithType('error', 'Error', 'Please set salon start time');
                                return
                            }
                            if (salon_hours[idToSetTime][1] == '' && salon_hours[idToSetTime][0] != 'closed' || salon_hours[idToSetTime][1] == '00:00') {
                                alertRef.alertWithType('error', 'Error', 'Please set salon end time');
                                return
                            }
                            // if (salon_hours[idToSetTime][0] > salon_hours[idToSetTime][1]) {
                            //     alertRef.alertWithType('error', 'Error', 'Salon end time must not be less than start time');
                            //     return
                            // }

                            setSetSalonTiming(false)
                            forceUpdate()

                        }}
                    />
                    <MainButton
                        btnStyle={{ marginTop: 10, alignSelf: 'center' }}
                        text={"Cancel"}
                        onPress={() => {
                            let arr = salon_hours;
                            arr[idToSetTime][0] = '00:00';
                            arr[idToSetTime][1] = '00:00';
                            setSalonHours(arr)
                            setSetSalonTiming(false)
                            forceUpdate()

                        }}
                    />
                </View>
            </View>
        )
    }

    if (pickerModal) {
        return (
            <View style={{ flex: 1, height: Dimensions.get('window').height, width: Dimensions.get('window').width, backgroundColor: '#111111' }}>
                <View style={{ position: 'absolute', top: 50, alignSelf: 'center', width: 200, backgroundColor: '#111111', alignItems: 'center', justifyContent: 'center', height: 50 }}>
                    <Text style={{ fontFamily: 'PBo', fontSize: 20, color: 'white', }}>Starts</Text>
                </View>
                <DatePickerModel />
                {/* <TouchableOpacity style={{ alignSelf: 'center', width: 200, backgroundColor: acolors.primary, alignItems: 'center', justifyContent: 'center', height: 50 }}>
                    <Text style={{ fontFamily: 'PBo', fontSize: 20, color: '#111111', }}>Apply to all</Text>
                </TouchableOpacity> */}

            </View >
        )
    }
    if (pickerModal1) {
        return (
            <View style={{ flex: 1, height: Dimensions.get('window').height, width: Dimensions.get('window').width, backgroundColor: '#111111' }}>
                <View style={{ position: 'absolute', top: 50, alignSelf: 'center', width: 200, backgroundColor: '#111111', alignItems: 'center', justifyContent: 'center', height: 50 }}>
                    <Text style={{ fontFamily: 'PBo', fontSize: 20, color: 'white', }}>Ends</Text>
                </View>
                <DatePickerModel2 />
            </View>
        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#111111' }}>

            {loading && <Loader />}
            <DropdownAlert ref={(ref) => alertRef = ref} />

            <StatusBar
                style="light"
                backgroundColor="#111111"
                translucent={false}
            />

            <SafeAreaView style={{ marginTop: 10, width: "90%", alignSelf: 'center' }}>
                <OnBoardingHeader title="Your Saloon Hours" />
                <ScrollView>
                    <Text style={{ marginTop: 30, fontFamily: 'ABRe', fontSize: 16, color: acolors.white, marginBottom: 10 }}>When your clients book with you?</Text>
                    <View style={{ justifyContent: 'center' }}>
                        {
                            salon_hours.map((v, i) => {
                                return (
                                    <TouchableOpacity
                                        key={i}
                                        onPress={() => {
                                            setIdToSetTime(i);
                                            setSetSalonTiming(true)
                                            // forceUpdate();

                                            // daysArr[i].picker = true
                                            // console.log(daysArr)
                                            // forceUpdate()
                                        }}
                                        // onPress={() => navigate('SalonTimingSet')}
                                        style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 15, borderBottomWidth: 1, borderColor: 'rgba(255, 255, 255, 0.1)', marginTop: 20 }}>
                                        <Text style={{ fontFamily: 'ABRe', fontSize: 14, color: acolors.white }}>{daysArr[i]}</Text>
                                        <Text style={{ fontFamily: 'ABRe', fontSize: 14, color: acolors.white, marginLeft: i == 2 ? -10 : i == 0 ? 10 : i == 4 ? 10 : 0 }}>  {v[0] == 'closed' ? 'closed' : v[0] + " - " + v[1]}</Text>
                                        <View>
                                            <ArrowRight1 />
                                        </View>
                                        {/* {
                                            
                                        } */}

                                    </TouchableOpacity>

                                )
                            })
                        }
                    </View>
                    {/* <MainButton
                        text="Set to all"
                        btnStyle={{ width: "90%", alignSelf: 'center', marginTop: 20 }}
                        onPress={() => {
                            setIdToSetTime('all')
                            setPickerModal(true)
                            // next();
                            // navigate('AddSalonPhoto')
                        }}
                    /> */}

                    <MainButton
                        text="Continue"
                        btnStyle={{ width: "90%", alignSelf: 'center', marginTop: 40 }}
                        onPress={() => {
                            for (let key in salon_hours) {
                                if (salon_hours[key][0] == '00:00') {
                                    alertRef.alertWithType('error', 'Error', "Please set " + daysArr[key] + " timing ");
                                    return
                                }
                            }
                            next();
                            // navigate('AddSalonPhoto')
                        }}
                    />
                </ScrollView>
            </SafeAreaView>


        </View >
    )
}

const styles = StyleSheet.create({
    activeDot: {
        width: 9,
        height: 9,
        borderRadius: 4.5,
        backgroundColor: '#E2B378',
        marginLeft: 5
    },
    inActiveDot: {
        width: 9,
        height: 9,
        borderRadius: 4.5,
        backgroundColor: '#FCFCFC',
        marginLeft: 8
    },

})

export default SalonTiming

{/* <MainButton
                    text={"Closed"}
                    onPress={() => {
                        let arr = salon_hours;
                        arr[idToSetTime][0] = 'closed';
                        // arr.splice()
                        arr[idToSetTime][1] = '';
                        console.log(arr)
                        setSalonHours(arr)
                        forceUpdate()
                        setSetSalonTiming(false)
                    }}
                /> */}
{/* <MainButton
                    btnStyle={{ marginTop: 20 }}
                    text={"Set Time"}
                    onPress={() => {
                        setPickerModal(true);
                        setSetSalonTiming(false)
                        forceUpdate()

                    }}
                /> */}