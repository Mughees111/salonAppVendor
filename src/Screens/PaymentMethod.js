import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, FlatList } from 'react-native'
import { goBack, navigate } from '../../Navigations';
import { ArrowDown, ArrowLeft, ArrowRight, CloseDropDown, FbIcon, GoogleIcon, UnMarkedIcon, MarkedIcon } from '../Components/Svgs';
import { acolors } from '../Components/AppColors';
import CustomTextInput from '../Components/CustomTextInput';
import PrivacyPicker from '../Components/PrivacyPicker';
import { MainButton } from '../Components/Buttons';
import { OnBoardingHeader } from '../Components/Header';


import { update_dp, update_dp_2, retrieveItem, storeItem } from '../utils/functions';
import DropdownAlert from 'react-native-dropdownalert';
import { useFocusEffect } from '@react-navigation/native';
import { apiRequest } from '../utils/apiCalls';
import Loader from '../utils/Loader';


var alertRef;
const PaymentMethd = () => {

    const [expandList, setExpandList] = useState(false)
    const [loading, setLoading] = useState(false)
    const [paymentMethod, setPaymentMethod] = useState({
        visa: false,
        paypal: false,
        cash: false
    })
  

   
    useEffect(() => {
      
        retrieveItem('login_data')
    
      
    }, [])
    


    return (
        <View style={{ flex: 1, backgroundColor: '#111111' }}>
            <StatusBar
                style='light'
                backgroundColor={acolors.bgColor}
                translucent={false}
            // translucent={false}
            />
            {loading && <Loader />}
            <DropdownAlert ref={(ref) => alertRef = ref} />
            <SafeAreaView style={{ marginTop: 10, width: "90%", alignSelf: 'center' }}>
                <OnBoardingHeader title="Account" />
                <ScrollView>
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
                        <Text style={{ color: '#FCFCFC', fontFamily: 'ABRe', fontSize: 14, marginLeft: 10 }}>Visa</Text>
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
                        <Text style={{ color: '#FCFCFC', fontFamily: 'ABRe', fontSize: 14, marginLeft: 10 }}>Paypal</Text>
                        <View

                            style={{ position: 'absolute', right: 15 }}>
                            {paymentMethod.paypal ? <MarkedIcon /> : <UnMarkedIcon />}
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            setPaymentMethod({
                                ...paymentMethod,
                                cash: !paymentMethod.cash
                            })
                        }}
                        style={{ width: "100%", height: 76, flexDirection: 'row', paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center', backgroundColor: '#1B1B1B', marginTop: 15 }}>
                        <Image
                            source={require('../assets/cashPayment.png')}
                        />
                        <Text style={{ color: '#FCFCFC', fontFamily: 'ABRe', fontSize: 14, marginLeft: 10 }}>Cash Payment</Text>
                        <View style={{ position: 'absolute', right: 15 }}>
                            {paymentMethod.cash ? <MarkedIcon /> : <UnMarkedIcon />}
                        </View>
                    </TouchableOpacity>






                    <MainButton
                        text="Save"
                        btnStyle={{ marginTop: 30 }}
                        onPress={() => {
                            
                            
                        }}
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
