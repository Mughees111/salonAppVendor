import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, FlatList } from 'react-native'
import { goBack, navigate } from '../../Navigations';
import { ArrowDown, ArrowLeft, ArrowRight, CloseDropDown, FbIcon, GoogleIcon, UnMarkedIcon, MarkedIcon, SuccessIcon } from '../Components/Svgs';
import { acolors } from '../Components/AppColors';
import CustomTextInput from '../Components/CustomTextInput';
import PrivacyPicker from '../Components/PrivacyPicker';
import { MainButton } from '../Components/Buttons';
import { changeLoggedIn } from '../../Common';

const Congrats = () => {

    const [expandList, setExpandList] = useState(false)
    const [paymentMethod, setPaymentMethod] = useState({
        visa: false,
        paypal: false,
        cashPayment: false
    })
    const prices = [
        "Fixed",
        "Starts at",
        "Varies",
        "Free",
        "Don’t Show"
    ];


    return (
        <View style={{ flex: 1, backgroundColor: '#111111' }}>
            <StatusBar
                style="light"
                backgroundColor="#111111"
            />

            <SafeAreaView style={{ marginTop: 75, width: "90%", alignSelf: 'center', alignItems: 'center' }}>
                <SuccessIcon />
                <Text style={{ fontSize: 24, color: '#fff', fontFamily: 'ABRe', textAlign: 'center', marginTop: 10 }}>Congratulations{"\n"}You’re All Set</Text>
                <Text style={{ fontSize: 14, color: '#fff', fontFamily: 'ABRe', textAlign: 'center', marginTop: 20 }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Felis mauris at at nullam. Risus enim tellus pretium faucibus.</Text>


            </SafeAreaView>
            <MainButton
                text="Continue"
                btnStyle={{ position: 'absolute', bottom: 100,width:"90%",alignSelf:'center' }}
                onPress={() => { 
                    // navigate('BottomTabNavigator') 
                    changeLoggedIn.changeNow(1);
                }}
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

export default Congrats
