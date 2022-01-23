import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useEffect, useState } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image, SafeAreaView, FlatList, Dimensions, Alert, ScrollView, Switch, TextInput } from 'react-native'
import { goBack, navigate, navigateFromStack } from '../../Navigations';
import { acolors } from '../Components/AppColors';
import { MainButton } from '../Components/Buttons';
import { OnBoardingHeader } from '../Components/Header';
import { ArrowDown } from '../Components/Svgs';

import { useFocusEffect } from '@react-navigation/native';
import { apiRequest } from '../utils/apiCalls';
import { retrieveItem, useForceUpdate, doConsole, formatDate } from '../utils/functions';
import Loader from '../utils/Loader';
import DropdownAlert from 'react-native-dropdownalert';
import ReactNativeModal from 'react-native-modal';

import { Calendar } from 'react-native-calendars';

import DateTimePicker from '@react-native-community/datetimepicker';


var alertRef;


const CancelAppointment = (props) => {

    const forceUpdate = useForceUpdate();
    // const { state, setUserGlobal } = useContext(Context);
    const [loading, setLoading] = useState(false);
    const [dateModal, setDateModal] = useState(false);
    const [timeModal, setTimeModal] = useState(false)



    const [data, setData] = useState(props?.route?.params ? props.route.params : null);
    const [reason, setReason] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');

    console.log(props.route.params)

    function cancel_app_vendor() {

        if (!reason.length) {
            alertRef.alertWithType('error', 'Error', "Please provide cancel reason");
            return
        }
        if (date.length && !time.length) {
            alertRef.alertWithType('error', 'Error', "Time is mandotory with time");
            return
        }



        retrieveItem('login_data')
            .then(d => {
                var reasonString;
                if (date) {
                    // Alert.alert('asd')
                    reasonString = reason + "\nAlternative time " + date + " " + time;
                    doConsole(reasonString);
                }
                else reasonString = reason;
                const reqObj = {
                    token: d.token,
                    cancelled_reason: reasonString,
                    app_id: data.app_id
                }
                setLoading(true)
                apiRequest(reqObj, 'cancel_app_vendor')
                    .then(data => {
                        setLoading(false)
                        if (data.action == 'success') {
                            alertRef.alertWithType('success', 'Success', "This appointment has been cancelled");
                            setTimeout(() => {
                                props.navigation.navigate('AppointmentStack', {
                                    screen: 'Appointments',
                                })
                            }, 700);
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
                    let hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
                    let minutes = date.getMinutes() == 0 ? "00" : date.getMinutes();
                    let time = hours + ":" + minutes;
                    setTime(time);
                    setTimeModal(false)
                }


            }}
            style={{ backgroundColor: 'red', color: 'red' }}

        />


    )


    return (
        <View style={{ flex: 1, backgroundColor: acolors.bgColor }}>
            <StatusBar
                style='light'
                backgroundColor={acolors.bgColor}
            // translucent={false}
            />
            {loading && <Loader />}
            <DropdownAlert ref={(ref) => alertRef = ref} />

            <ReactNativeModal
                isVisible={dateModal}
                onBackdropPress={() => setDateModal(false)}
            >
                <View style={{ marginTop: 15 }}>
                    <Calendar
                        style={{ width: "100%", alignSelf: 'center', backgroundColor: acolors.bgColor }}
                        onDayPress={(day) => {
                            setDate(day.dateString)
                            setDateModal(false)
                            forceUpdate();
                        }}

                        current={formatDate(new Date())}
                        minDate={formatDate(new Date)}
                        enableSwipeMonths={true}
                        // markingType={'custom'}
                        disableArrowRight={true}
                        theme={{
                            calendarBackground: acolors.bgColor,

                            selectedDayBackgroundColor: acolors.primary,
                            selectedDayTextColor: acolors.bgColor,
                            selectedDotColor: acolors.bgColor,

                            arrowColor: '#001833',
                            todayTextColor: '#0A0A16',
                            dayTextColor: 'white',
                            textDayFontFamily: 'ABRe',
                            textDisabledColor: 'rgba(255,255,255,0.4)',


                            monthTextColor: acolors.primary,
                            textDayFontSize: 10, // dates 1 ,2,3,4
                            textMonthFontSize: 14, // month name dec 2021
                            textMonthFontFamily: 'ABRe',


                            //  these are the monday, tuesday, wed headings
                            textSectionTitleColor: 'rgba(255, 255, 255, 0.5)',
                            textDayHeaderFontSize: 14,
                            textDayHeaderFontFamily: "ABRe"

                        }}
                    />
                </View>
            </ReactNativeModal>


            <SafeAreaView style={{ flex: 1, marginTop: 25 }}>
                <View style={{ paddingHorizontal: 20 }}>
                    <OnBoardingHeader title="Cancellation" />
                    <Text style={{ marginTop: 20, fontFamily: 'ABRe', fontSize: 13, color: 'white', lineHeight: 21.5 }}>Write down the reason why you canceling the appointment</Text>
                    <TextInput
                        onChangeText={setReason}
                        textAlignVertical='top'
                        multiline={true}
                        style={{ width: "100%", minHeight: 100, fontSize: 16, padding: 10, paddingVertical: 10, fontFamily: 'ABRe', color: 'white', borderRadius: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)', marginTop: 10 }}
                        placeholder='Write Here ...'
                        placeholderTextColor={"rgba(255,255,255,0.5)"}
                    />
                    <Text style={{ marginTop: 20, fontFamily: 'ABRe', fontSize: 13, color: 'white', lineHeight: 21.5 }}>Alternative Time</Text>
                    <Text style={{ marginTop: 5, fontFamily: 'ABRe', fontSize: 13, color: 'white', lineHeight: 21.5 }}>Suggest your client the alternative time for appointment</Text>
                    <Text style={{ fontFamily: 'ABRe', fontSize: 14, color: '#FCFCFC', marginTop: 20 }}>Date</Text>
                    <TouchableOpacity
                        onPress={() => setDateModal(true)}
                        style={{ width: "100%", paddingHorizontal: 10, height: 42, marginTop: 5, borderWidth: 1, borderColor: '#FCFCFC', borderRadius: 8, alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
                        <Text style={{ fontFamily: 'ABRe', fontSize: 14, color: '#FCFCFC' }}>{date}</Text>
                        <ArrowDown />
                    </TouchableOpacity>
                    <Text style={{ fontFamily: 'ABRe', fontSize: 14, color: '#FCFCFC', marginTop: 10 }}>Time</Text>
                    <TouchableOpacity
                        onPress={() => {
                            setTimeModal(true)
                        }}
                        style={{ width: "100%", paddingHorizontal: 10, height: 42, marginTop: 5, borderWidth: 1, borderColor: '#FCFCFC', borderRadius: 8, alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
                        <Text style={{ fontFamily: 'ABRe', fontSize: 14, color: '#FCFCFC' }}>{time}</Text>
                        <ArrowDown />
                    </TouchableOpacity>

                    {timeModal && <DatePickerModel />}
                </View>

                <View style={{ flexDirection: 'row', width: "90%", alignSelf: 'center', position: 'relative', marginTop: 50, justifyContent: 'space-between' }}>
                    <TouchableOpacity
                        onPress={() => goBack()}
                        style={{ width: "45%", height: 45, borderRadius: 26, marginTop: 20, borderWidth: 1, borderColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontFamily: 'ABRe', fontSize: 11.94, color: 'white' }}>Go Back</Text>
                    </TouchableOpacity>
                    <MainButton
                        text={"Cancel Now"}
                        btnStyle={{ marginTop: 20, width: "45%" }}
                        textStyle={{ fontSize: 11.94 }}
                        onPress={() => cancel_app_vendor()}

                    />
                </View>

            </SafeAreaView >
        </View >
    )
}

const styles = StyleSheet.create({
    radioBtn: {
        width: 20,
        height: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',

    }
})



export default CancelAppointment
