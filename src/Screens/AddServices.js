import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native'
import { goBack, navigate } from '../../Navigations';
import { ArrowLeft, ArrowRight1, CameraIcon, CrossIcon, FbIcon, GoogleIcon, PlusCircle, PlusIcon } from '../Components/Svgs';
import { acolors } from '../Components/AppColors';
import CustomTextInput from '../Components/CustomTextInput';
import PrivacyPicker from '../Components/PrivacyPicker';
import { MainButton } from '../Components/Buttons';
import { OnBoardingHeader } from '../Components/Header';

const AddServices = () => {

    const ServicesView = ({ title, time, price }) => (
        <TouchableOpacity
            onPress={() => navigate('ServiceDetails')}
            activeOpacity={0.8}
            style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
            <TouchableOpacity style={{ padding: 5, paddingLeft: 0 }}>
                <CrossIcon />
            </TouchableOpacity>
            <View style={{ marginLeft: 10 }}>
                <Text style={{ color: 'rgba(255,255,255,1)', fontSize: 15, fontFamily: 'AbRe' }}>{title}</Text>
                <Text style={{ color: 'rgba(255,255,255,1)', fontSize: 12, fontFamily: 'AbRe', marginTop: 2 }}>{time}</Text>
            </View>
            <View style={{ position: 'absolute', right: 0, flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ marginRight: 30, color: 'rgba(255,255,255,1)', fontFamily: 'AbRe', fontSize: 15 }}>{price}</Text>
                <ArrowRight1 />
            </View>

        </TouchableOpacity >
    )
    return (
        <View style={{ flex: 1, backgroundColor: '#111111' }}>
            <StatusBar
                style="light"
                backgroundColor="#111111"
            />

            <SafeAreaView style={{ marginTop: 35, width: "90%", alignSelf: 'center' }}>
                <OnBoardingHeader title="Add Services" />
                <ScrollView>
                    <Text style={{ marginTop: 30, fontFamily: 'AbRe', fontSize: 16, color: acolors.white, marginBottom: 10 }}>Add at least one service now</Text>
                    <ServicesView title="Mens’s New Hair Cut" time="25 - 30 mins" price="$50" />
                    <ServicesView title="Men Skin Polish" time="15 - 20 mins" price="$40" />
                    <ServicesView title="Oil Treatment" time="10 - 20 mins" price="$35" />
                    <ServicesView title="Peaceful Massage" time="45 - 50 mins" price="$90" />
                    <TouchableOpacity 
                        onPress={() => navigate('ServiceDetails')}
                        style={{ flexDirection: 'row', marginTop: 25, alignItems: 'center' }}>
                        <PlusIcon />
                        <Text style={{ color: 'rgba(252, 252, 252, 1)', fontSize: 14, fontFamily: 'AbRe', marginLeft: 5 }}>Add Service</Text>
                    </TouchableOpacity>
                </ScrollView>
            </SafeAreaView>
            <MainButton
                text="Continue"
                btnStyle={{ position: 'absolute', bottom: 100, width: "90%", alignSelf: 'center' }}
                onPress={() => { navigate('ServiceDetails') }}
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

export default AddServices
