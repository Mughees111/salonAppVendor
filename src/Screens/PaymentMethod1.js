import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, FlatList, Modal, Dimensions, Alert } from 'react-native'
import { goBack, navigate } from '../../Navigations';
import { UnMarkedIcon, MarkedIcon } from '../Components/Svgs';
import { acolors } from '../Components/AppColors';
import CustomTextInput from '../Components/CustomTextInput';
import PrivacyPicker from '../Components/PrivacyPicker';
import { MainButton } from '../Components/Buttons';
import { Header } from '../Components/Header';

import { useFocusEffect } from '@react-navigation/native';
import { apiRequest } from '../utils/apiCalls';
import { retrieveItem, useForceUpdate, doConsole } from '../utils/functions';
import Loader from '../utils/Loader';
import DropdownAlert from 'react-native-dropdownalert';
// import { Context } from '../Context/DataContext';

import { WebView } from 'react-native-webview';
import { urls } from '../utils/Api_urls';

var alertRef;


const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

const PaymentMethods = (props) => {



    const forceUpdate = useForceUpdate();

    const [loading, setLoading] = useState(false);


    const [expandList, setExpandList] = useState(false)
    // const [paymentMethod, setPaymentMethod] = useState({
    //     visa: false,
    //     paypal: false,
    //     cashPayment: false
    // })

    const [paymentMethod, setPaymentMethod] = useState('')

    const [paypalModal, setPaypalModal] = useState(false);
    const [stripeModal, setStripeModal] = useState(false);
    const [shown_suc, setshown_suc] = useState(false);

    const [userData, setUserData] = useState();

    // const { app_id } = props.route.params
    const [app_id, setAppId] = useState(props?.route?.params?.app_id ? props?.route?.params.app_id : 0)

    useEffect(() => {
        retrieveItem('login_data')
            .then(data => {
                setUserData(data)
            })
    }, [])

    const tryPayment = () => {


        // console.log(cart.payment.paymentMethod.title)
        if (paymentMethod == 'paypal') {
            setPaypalModal(true);
        }
        if (paymentMethod == "stripe") {
            setStripeModal(true);
        }


    }


    const _onNavigationStateChange = (webViewState) => {
        console.log(webViewState.url);
        console.log('parts')
        var parts = webViewState.url.split('/');
        doConsole(parts);



        console.log(shown_suc)
        if ((parts[5] == "paypal_is_good") || parts[4] == "paypal_is_good" && !shown_suc) {
            setshown_suc(true);
            setPaypalModal(false);
            setStripeModal(false)
            forceUpdate();
            goBack();
            // navigate('AppointBooked', props?.route?.params?.date);
            // goOrder(parts[6]);
        }
    }


    const _render_paypal = () => {
        const jsCode = `(function() {
            var originalPostMessage = window.postMessage;
        
            var patchedPostMessage = function(message, targetOrigin, transfer) {
              originalPostMessage(message, targetOrigin, transfer);
            };
        
            patchedPostMessage.toString = function() {
              return String(Object.hasOwnProperty).replace('hasOwnProperty', 'postMessage');
            };
        
            window.postMessage = patchedPostMessage;
          })();`;
        // console.log
        return (
            <Modal
                animationType="slide"
                style={{
                    width: viewportWidth,
                    marginLeft: 0
                }}
                transparent={true}
                visible={paypalModal}
                onRequestClose={() => {
                    setPaypalModal(false)
                }}>
                <View style={{
                    width: viewportWidth * (100 / 100),
                    backgroundColor: '#fff',
                    marginTop: viewportHeight * (5 / 100),
                    borderTopRightRadius: 10,
                    borderTopLeftRadius: 10,
                    height: viewportHeight * (95 / 100),
                    overflow: "hidden"

                }}>

                    {/* popup header */}
                    <View style={{
                        width: "100%",
                        height: "100%"

                    }}>
                        <View style={{ flex: 0.9, alignSelf: "center", width: "100%" }}>
                            <View style={{ zIndex: 1 }}>
                                <DropdownAlert ref={ref => alertRef = ref} />
                            </View>

                            <View style={{
                                flexDirection: 'row',
                                paddingHorizontal: "5%",
                                backgroundColor: "#30BDEB",
                                paddingVertical: 20,
                                alignItems: "center"
                            }}>
                                <View style={{ flex: 0.2 }}>
                                </View>
                                <View style={{
                                    flex: 0.6,
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Text style={{
                                        fontSize: 16,
                                        fontWeight: "bold",
                                        color: "#fff"
                                    }}>
                                        PayPal
                                    </Text>

                                </View>
                                <View style={{ flex: 0.2, alignItems: "flex-end" }}>
                                    <TouchableOpacity
                                        style={{
                                            justifyContent: "center"
                                        }}
                                        onPress={() => {
                                            setPaypalModal(false)
                                            setLoading(false)
                                        }}
                                    >
                                        <Text style={{ color: "#fff" }} >Cancel</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            {/* header close */}
                            <View style={{ height: '100%', width: viewportWidth * (90 / 100), alignSelf: "center" }}>

                                <WebView
                                    onNavigationStateChange={_onNavigationStateChange.bind(this)}
                                    startInLoadingState={true}
                                    onLoadStart={() => setLoading(true)}
                                    onLoadProgress={() => setLoading(true)}
                                    onLoadEnd={() => { setLoading(false) }}
                                    renderLoading={() => (
                                        <Loader />
                                    )}
                                    // user?.id + "/" + getCartTotal(false)
                                    source={{ uri: urls.API + "pay_paypal_v/" + app_id + "/" + userData?.sal_id }} style={{ marginTop: 20 }} />
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>

        )
    }
    const _render_stripe = () => {
        const jsCode = `(function() {
            var originalPostMessage = window.postMessage;
        
            var patchedPostMessage = function(message, targetOrigin, transfer) {
              originalPostMessage(message, targetOrigin, transfer);
            };
        
            patchedPostMessage.toString = function() {
              return String(Object.hasOwnProperty).replace('hasOwnProperty', 'postMessage');
            };
        
            window.postMessage = patchedPostMessage;
          })();`;
        // console.log
        return (
            <Modal
                animationType="slide"
                style={{

                    width: viewportWidth,
                    marginLeft: 0
                }}
                transparent={true}
                visible={stripeModal}
                onRequestClose={() => {
                    setStripeModal(false)
                }}>
                <View style={{
                    width: viewportWidth * (100 / 100),
                    backgroundColor: '#fff',
                    marginTop: viewportHeight * (5 / 100),
                    borderTopRightRadius: 10,
                    borderTopLeftRadius: 10,
                    height: viewportHeight * (95 / 100),
                    overflow: "hidden"

                }}>

                    {/* popup header */}
                    <View style={{
                        width: "100%",
                        height: "100%"

                    }}>
                        <View style={{ flex: 0.9, alignSelf: "center", width: "100%" }}>
                            <View style={{ zIndex: 1 }}>
                                <DropdownAlert ref={ref => alertRef = ref} />
                            </View>

                            <View style={{flexDirection: 'row',paddingHorizontal: "5%",backgroundColor: "#30BDEB",paddingVertical: 20,alignItems: "center"}}>
                                <View style={{ flex: 0.2 }}></View>
                                <View style={{flex: 0.6,alignItems: 'center',justifyContent: 'center'}}>
                                    <Text style={{fontSize: 16,fontWeight: "bold",color: "#fff"}}>Credit/Debit Card</Text>
                                </View>
                                <View style={{ flex: 0.2, alignItems: "flex-end" }}>
                                    <TouchableOpacity
                                        style={{
                                            justifyContent: "center"
                                        }}
                                        onPress={() => setStripeModal(false)}
                                    >
                                        <Text style={{ color: "#fff" }} >Cancel</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            {/* header close */}
                            <View style={{ height: '100%', width: viewportWidth * (90 / 100), alignSelf: "center" }}>

                                <WebView
                                    onNavigationStateChange={_onNavigationStateChange.bind(this)}
                                    startInLoadingState={true}
                                    // user?.id 
                                    source={{ uri: urls.API + "pay_stripe_v/" + app_id + "/" + userData?.sal_id }} style={{ marginTop: 20 }} />
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>

        )
    }




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
                style='light'
                backgroundColor={acolors.bgColor}
                translucent={false}
            />
            {loading && <Loader />}
            <DropdownAlert ref={(ref) => alertRef = ref} />
            {_render_paypal()}
            {_render_stripe()}

            <SafeAreaView style={{ marginTop: 10, width: "90%", alignSelf: 'center' }}>
                {/* <Header title="Add Payment Method" /> */}
                <ScrollView>
                    <Text style={{ marginTop: 30, fontFamily: 'ABRe', fontSize: 16, color: acolors.white }}>Please choose payment method</Text>
                    <TouchableOpacity
                        onPress={() => {
                            // navigate('AddCardDetails')
                            setPaymentMethod('stripe');
                            // setPaymentMethod({
                            //     ...paymentMethod,
                            //     visa: !paymentMethod.visa
                            // })
                        }}
                        style={{ width: "100%", height: 76, flexDirection: 'row', paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center', backgroundColor: '#1B1B1B', marginTop: 15 }}>
                        <Image
                            style={{ width: 40, resizeMode: 'contain' }}
                            source={require('../assets/visa.png')}
                        />
                        <Text style={{ color: '#FCFCFC', fontFamily: 'ABRe', fontSize: 14, marginLeft: 10 }}>Credit/Debit</Text>
                        <Text style={{ color: '#FCFCFC', fontFamily: 'ABRe', fontSize: 12, marginLeft: 10, marginTop: 5 }}>**********</Text>
                        <View style={{ position: 'absolute', right: 15 }}>
                            {paymentMethod == 'stripe' ? <MarkedIcon /> : <UnMarkedIcon />}
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {

                            setPaymentMethod('paypal');
                            // setPaymentMethod({
                            //     ...paymentMethod,
                            //     paypal: !paymentMethod.paypal
                            // })
                            // navigate('PaypalAccount')
                        }}
                        style={{ width: "100%", height: 76, flexDirection: 'row', paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center', backgroundColor: '#1B1B1B', marginTop: 15 }}>
                        <Image
                            source={require('../assets/paypal.png')}
                        />
                        <View>
                            <Text style={{ color: '#FCFCFC', fontFamily: 'ABRe', fontSize: 14, marginLeft: 10 }}>Paypal</Text>
                            <Text style={{ color: '#FCFCFC', fontFamily: 'ABRe', fontSize: 12, marginLeft: 10, marginTop: 5 }}>paypal</Text>
                        </View>

                        <View
                            style={{ position: 'absolute', right: 15 }}>
                            {paymentMethod == 'paypal' ? <MarkedIcon /> : <UnMarkedIcon />}
                        </View>
                    </TouchableOpacity>


                    <MainButton
                        text="Next"
                        btnStyle={{ marginTop: 30 }}
                        onPress={() => {
                            tryPayment();
                            // console.log(paymentMethod)
                            // tryPayment()
                            // navigate('AddCardDetails') 
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

export default PaymentMethods






