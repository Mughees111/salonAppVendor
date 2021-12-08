import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native'
import { goBack, navigate } from '../../Navigations';
import { ArrowLeft, ArrowRight, ArrowRight1, FbIcon, GoogleIcon, PlusCircle } from '../Components/Svgs';
import { acolors } from '../Components/AppColors';
import CustomTextInput from '../Components/CustomTextInput';
import PrivacyPicker from '../Components/PrivacyPicker';
import { MainButton } from '../Components/Buttons';

const SalonTiming = () => {

    const TimingView = ({ day, hours }) => (
        <TouchableOpacity
            // onPress={()=>navigate('SalonTimingSet')}
            style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 15, borderBottomWidth: 1, borderColor: 'rgba(255, 255, 255, 0.1)', marginTop: 20 }}>
            <Text style={{ fontFamily: 'AbRe', fontSize: 14, color: acolors.white }}>{day}</Text>
            <Text style={{ fontFamily: 'AbRe', fontSize: 14, color: acolors.white }}>{hours}</Text>
            <View>
                <ArrowRight1 />
            </View>
        </TouchableOpacity>
    )

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
                    <Text style={{ marginTop: 30, fontFamily: 'AbRe', fontSize: 16, color: acolors.white, marginBottom: 10 }}>When your clients book with you?</Text>
                    <View>
                        <TimingView day="Monday       " hours="10:00 am - 7:00 pm" />
                        <TimingView day="Tuesday      " hours="10:00 am - 7:00 pm" />
                        <TimingView day="Wednesday" hours="10:00 am - 7:00 pm" />
                        <TimingView day="Thursday     " hours="10:00 am - 7:00 pm" />
                        <TimingView day="Friday       " hours="10:00 am - 7:00 pm" />
                        <TimingView day="Saturday    " hours="10:00 am - 7:00 pm" />
                        <TimingView day="Sunday       " hours="Closed                     " />
                    </View>

                    <MainButton
                        text="Continue"
                        btnStyle={{  width: "90%", alignSelf: 'center', marginTop: 20 }}
                        onPress={() => { navigate('AddSalonPhoto') }}
                    />
                </ScrollView>
            </SafeAreaView>


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

export default SalonTiming
