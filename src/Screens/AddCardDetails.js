import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native'
import { goBack, navigate } from '../../Navigations';
import { ArrowLeft, PaypalIcon } from '../Components/Svgs';
import { acolors } from '../Components/AppColors';
import CustomTextInput from '../Components/CustomTextInput';
import { MainButton } from '../Components/Buttons';
import PrivacyPicker from '../Components/PrivacyPicker';


import { apiRequest } from '../utils/apiCalls';
import { retrieveItem, useForceUpdate, doConsole, update_dp, update_dp_2, storeItem, validateEmail } from '../utils/functions';
import Loader from '../utils/Loader';
import DropdownAlert from 'react-native-dropdownalert';
import { Context } from '../Context/DataContext';
import { changeLoggedIn } from '../../Common';




var alertRef;
const AddCardDetails = () => {

    const forceUpdate = useForceUpdate();
    const [loading, setLoading] = useState(false);
    const [postObj, setPostObj] = useState({
        acc_type: '',
        name_on_card: '',
        card_no: '',
        cvc: '',
        expiry_date: '',
    })



    useEffect(() => {
        retrieveItem('login_data')
            .then(d => {
                if (d) {
                    setPostObj({
                        ...postObj,
                        acc_type: d.acc_type,
                        name_on_card: d.name_on_card,
                        card_no: d.card_no,
                        cvc: d.cvc,
                        expiry_date: d.expiry_date,
                    })
                    forceUpdate();
                }
            })
    }, [])

    function add_account() {


        if (!postObj.acc_type) {
            alertRef.alertWithType('error', "Error", "Please enter account type");
            return;
        }
        if (!postObj.acc_type) {
            alertRef.alertWithType('error', "Error", "Please enter name on card");
            return;
        }
        if (!postObj.acc_type) {
            alertRef.alertWithType('error', "Error", "Please enter card no");
            return;
        }
        if (!postObj.acc_type) {
            alertRef.alertWithType('error', "Error", "Please enter expiry date");
            return;
        }
        retrieveItem('login_data')
            .then(data => {

                postObj.token = data?.token
                console.log(postObj)

                setLoading(true)
                apiRequest(postObj, 'add_account')
                    .then(data => {
                        setLoading(false)
                        if (data.action == 'success') {
                            alertRef.alertWithType('success', "Success", "");
                            storeItem('login_data', data?.data)
                            setTimeout(() => {
                                goBack();
                            }, 1000);
                        }
                        else {
                            alertRef.alertWithType('error', "Success", "");
                        }
                    })
                    .catch(err => {
                        setLoading(false)
                    })
            })
    }


    return (
        <View style={{ flex: 1, backgroundColor: acolors.bgColor }}>
            <StatusBar
                style='light'
                backgroundColor={acolors.statusBar}
                translucent={false}
            />

            {loading && <Loader />}
            <DropdownAlert ref={(ref) => alertRef = ref} />


            <SafeAreaView style={{ marginTop: 15, width: "90%", alignSelf: 'center' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <TouchableOpacity
                        onPress={() => goBack()}
                        style={{ width: 34, height: 34, borderRadius: 34 / 2, backgroundColor: 'rgba(255,255,255,0.1)', alignItems: 'center', justifyContent: 'center' }}>
                        <ArrowLeft />
                    </TouchableOpacity>
                    <Text style={{ fontFamily: 'PMe', fontSize: 16, color: acolors.white }}>Add Card Details</Text>
                    <Text>          </Text>
                </View>
                <ScrollView>

                    <View style={{ flexDirection: 'row', marginTop: 30, alignItems: 'center' }}>
                        {/* <Text style={{ marginTop: 3, fontFamily: 'PRe', fontSize: 16, color: acolors.white, }}>Log In to </Text> */}
                        {/* <PaypalIcon /> */}
                    </View>
                    {/* <Image
                        style={{ marginTop: 15, width: "100%", resizeMode: 'contain' }}
                        source={require('../assets/cardDetails.png')}
                    /> */}
                    <View style={{ width: "100%", height: 42, marginTop: 15, borderWidth: 1, borderColor: '#FCFCFC', borderRadius: 8, alignItems: 'center', justifyContent: 'center' }}>
                        {
                            postObj?.acc_type ?

                                <PrivacyPicker
                                    selected={{ title: postObj?.acc_type ? postObj?.acc_type : "Account type" }}
                                    data={[{ title: "Credit/Debit" }, { title: "Paypal" }]}
                                    onValueChange={(index, title) => {
                                        setPostObj({
                                            ...postObj,
                                            acc_type: title.title
                                        });
                                        // setSaltype(title.title)
                                    }}
                                />
                                : null
                        }
                        {
                            !postObj?.acc_type && <PrivacyPicker
                                selected={{ title: "Account type" }}
                                data={[{ title: "Credit/Debit" }, { title: "Paypal" }]}
                                onValueChange={(index, title) => {
                                    setPostObj({
                                        ...postObj,
                                        acc_type: title.title
                                    });
                                    // setSaltype(title.title)
                                }}
                            />
                        }
                    </View>
                    <CustomTextInput
                        placeholder="Name on Card"
                        style={{ marginTop: 15 }}
                        onChangeText={(v) => {
                            setPostObj({
                                ...postObj,
                                name_on_card: v
                            });
                        }}
                        value={postObj.name_on_card}
                    />

                    <CustomTextInput
                        placeholder="Card Number"
                        style={{ marginTop: 15, }}
                        onChangeText={(v) => {
                            setPostObj({
                                ...postObj,
                                card_no: v
                            });
                        }}
                        value={postObj.card_no}

                    />
                    <CustomTextInput
                        placeholder="CVC"
                        style={{ marginTop: 15, }}
                        onChangeText={(v) => {
                            setPostObj({
                                ...postObj,
                                cvc: v
                            });
                        }}
                        value={postObj.cvc}
                    />
                    <CustomTextInput
                        placeholder="Expiry date"
                        style={{ marginTop: 15, }}
                        onChangeText={(v) => {
                            setPostObj({
                                ...postObj,
                                expiry_date: v
                            });
                        }}
                        value={postObj.expiry_date}
                    />

                    <MainButton
                        text="Save"
                        btnStyle={{ marginTop: 30 }}
                        onPress={() => {
                            add_account();
                            // navigate('AppointBooked') 
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

export default AddCardDetails
