import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Switch, Platform } from 'react-native'
import { goBack, navigate } from '../../Navigations';
import { ArrowLeft, ArrowRight, ArrowRight1, FbIcon, GoogleIcon, PlusCircle } from '../Components/Svgs';
import { acolors } from '../Components/AppColors';
import CustomTextInput from '../Components/CustomTextInput';
import PrivacyPicker from '../Components/PrivacyPicker';
import { MainButton } from '../Components/Buttons';


const SalonTimingSet = () => {

    const [isEnabled, setIsEnabled] = React.useState(true);

    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('time');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };


    return (
        <View style={{ flex: 1, backgroundColor: '#111111' }}>
            <StatusBar
                style="light"
                backgroundColor="#111111"
            />

            <SafeAreaView style={{ marginTop: 35, width: "90%", alignSelf: 'center' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <TouchableOpacity
                        onPress={() => goBack()}
                        style={{ width: 34, height: 34, borderRadius: 34 / 2, backgroundColor: 'rgba(255,255,255,0.1)', alignItems: 'center', justifyContent: 'center' }}>
                        <ArrowLeft />
                    </TouchableOpacity>
                    <Text style={{ fontFamily: 'AbRe', fontSize: 16, color: acolors.white }}>Your Saloon Hours</Text>
                    <Text>          </Text>
                </View>

                <ScrollView>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={{ marginTop: 30, fontFamily: 'AbRe', fontSize: 16, color: acolors.white, marginBottom: 10 }}>Set your saloon hours here.</Text>
                        <View>
                            <Switch
                                style={{ transform: [{ scaleX: .8 }, { scaleY: .8 }], marginTop: 15 }}
                                trackColor={{ false: 'rgba(224, 224, 224, 1)', true: "rgba(224, 224, 224, 1)'", }}
                                thumbColor={isEnabled ? "#E2B378" : acolors.white}
                                ios_backgroundColor={isEnabled ? '#11111' : "rgba(224, 224, 224, 1)"}
                                onValueChange={() => setIsEnabled(!isEnabled)}
                                value={isEnabled}
                            />
                            <Text style={{ fontFamily: 'AbRe', fontSize: 7.8, color: acolors.white, alignSelf: 'center', marginTop: Platform.OS == 'android' ? -8 : 0 }}>{isEnabled ? "Open" : "Closed"}</Text>
                            {/* <View style={{backgroundColor:'#111111'}}>
                                <DateTimePicker
                                    // testID="dateTimePicker"
                                    style={{ backgroundColor: '#111111' }}
                                    value={date}
                                    mode={mode}
                                    is24Hour={true}
                                    display="spinner"
                                    onChange={onChange}
                                />
                            </View> */}
                        </View>
                    </View>


                </ScrollView>
            </SafeAreaView>
            <MainButton
                text="Continue"
                btnStyle={{ position: 'absolute', bottom: 100, width: "90%", alignSelf: 'center' }}
            // onPress={() => { navigate('OTP') }}
            />

        </View>
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

export default SalonTimingSet