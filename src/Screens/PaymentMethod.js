import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, FlatList } from 'react-native'
import { goBack, navigate } from '../../Navigations';
import { ArrowDown, ArrowLeft, ArrowRight, CloseDropDown, FbIcon, GoogleIcon, UnMarkedIcon, MarkedIcon } from '../Components/Svgs';
import { acolors } from '../Components/AppColors';
import CustomTextInput from '../Components/CustomTextInput';
import PrivacyPicker from '../Components/PrivacyPicker';
import { MainButton } from '../Components/Buttons';

const PaymentMethd = () => {

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

            <SafeAreaView style={{ marginTop: 35, width: "90%", alignSelf: 'center' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <TouchableOpacity
                        onPress={() => goBack()}
                        style={{ width: 34, height: 34, borderRadius: 34 / 2, backgroundColor: 'rgba(255,255,255,0.1)', alignItems: 'center', justifyContent: 'center' }}>
                        <ArrowLeft />
                    </TouchableOpacity>
                    <Text style={{ fontFamily: 'AbRe', fontSize: 16, color: acolors.white }}>Add Payment Method</Text>
                    <Text>          </Text>
                </View>

                <ScrollView>
                    <Text style={{ marginTop: 30, fontFamily: 'AbRe', fontSize: 16, color: acolors.white }}>Which type of payment you want to accept from clients</Text>
                    <TouchableOpacity
                        onPress={() => {
                            setPaymentMethod({
                                ...paymentMethod,
                                visa: !paymentMethod.visa
                            })
                        }}
                        style={{ width: "100%", height: 76, flexDirection: 'row', paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center', backgroundColor: '#1B1B1B', marginTop: 15 }}>
                        <Image
                            source={require('../assets/visa.png')}
                        />
                        <Text style={{ color: '#FCFCFC', fontFamily: 'AbRe', fontSize: 14, marginLeft: 10 }}>Debit/Credit Card</Text>
                        <View style={{ position: 'absolute', right: 15 }}>
                            {paymentMethod.visa ? <MarkedIcon /> : <UnMarkedIcon />}
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            setPaymentMethod({
                                ...paymentMethod,
                                paypal: !paymentMethod.paypal
                            })
                        }}
                        style={{ width: "100%", height: 76, flexDirection: 'row', paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center', backgroundColor: '#1B1B1B', marginTop: 15 }}>
                        <Image
                            source={require('../assets/paypal.png')}
                        />
                        <Text style={{ color: '#FCFCFC', fontFamily: 'AbRe', fontSize: 14, marginLeft: 10 }}>Debit/Credit Card</Text>
                        <View

                            style={{ position: 'absolute', right: 15 }}>
                            {paymentMethod.paypal ? <MarkedIcon /> : <UnMarkedIcon />}
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            setPaymentMethod({
                                ...paymentMethod,
                                cashPayment: !paymentMethod.cashPayment
                            })
                        }}
                        style={{ width: "100%", height: 76, flexDirection: 'row', paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center', backgroundColor: '#1B1B1B', marginTop: 15 }}>
                        <Image
                            source={require('../assets/visa.png')}
                        />
                        <Text style={{ color: '#FCFCFC', fontFamily: 'AbRe', fontSize: 14, marginLeft: 10 }}>Debit/Credit Card</Text>
                        <View style={{ position: 'absolute', right: 15 }}>
                            {paymentMethod.cashPayment ? <MarkedIcon /> : <UnMarkedIcon />}
                        </View>
                    </TouchableOpacity>






                    <MainButton
                        text="Save"
                        btnStyle={{ marginTop: 30 }}
                        onPress={() => { navigate('Congrats') }}
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

export default PaymentMethd
