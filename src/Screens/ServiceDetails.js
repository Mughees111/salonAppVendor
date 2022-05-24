import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, FlatList } from 'react-native'
import { goBack, navigate } from '../../Navigations';
import { ArrowDown, ArrowLeft, ArrowRight, CloseDropDown, FbIcon, GoogleIcon } from '../Components/Svgs';
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

const ServiceDetails = (props) => {

    const [expandList, setExpandList] = useState(false)
    const prices = [
        "Fixed",
        "Starts at",
        "Varies",
        "Free",
        "Don’t Show"
    ];
    const [s_time_mins, setSTimeMins] = useState(props?.route?.params?.s_time_mins ? props.route?.params.s_time_mins : '');
    const [s_name, setSname] = useState(props?.route?.params?.s_name ? props.route.params.s_name : '');
    const [s_price, setSPrice] = useState(props?.route?.params?.s_price ? props.route.params.s_price : '');
    const [s_desc, setSDesc] = useState(props?.route?.params?.s_desc ? props.route.params.s_desc : '');
    const [loading, setLoading] = useState(false)


    function next() {

        if (s_name.length < 2) {
            alertRef.alertWithType("error", "Error", "Please provide a valid name");
            return;
        }

        if (s_time_mins.length < 2) {
            alertRef.alertWithType("error", "Error", "Please provide a valid duration");
            return;
        }
        if (s_price.length < 1) {
            alertRef.alertWithType("error", "Error", "Please provide a valid price");
            return;
        }
        retrieveItem('login_data')
            .then(data1 => {

                var urlPlus;
                var reqObj = {}
                if (props?.route?.params?.id) {
                    reqObj = {
                        s_name,
                        s_price,
                        s_time_mins,
                        s_desc,
                        token: data1.token,
                        id: props.route.params.id
                    };
                    urlPlus = 'update_salon_service'
                }
                else {
                    reqObj = {
                        s_name,
                        s_price,
                        s_time_mins,
                        s_desc,
                        token: data1.token,
                    };
                    urlPlus = 'add_salon_services'
                }

                console.log(reqObj)
                setLoading(true)

                apiRequest(reqObj, urlPlus)
                    .then(data => {
                        setLoading(false)
                        if (data.action == 'success') {
                            alertRef.alertWithType("success", "Success", "");
                            storeItem('login_data', data.data)
                                .then(() => {
                                    goBack();
                                    // navigate('PaymentMethd')
                                })
                        }
                        else {
                            alertRef.alertWithType("error", "Error", data.error);
                        }
                    })
                    .catch(err => {
                        console.log(err)
                        alertRef.alertWithType("error", "Error", "Internet Error");
                        setLoading(false)
                    })
            })



    }

    return (
        <View style={{ flex: 1, backgroundColor: '#111111' }}>
            <StatusBar
                style="light"
                backgroundColor="#111111"
                translucent={false}
            />
            {
                loading && <Loader />
            }
            <DropdownAlert ref={(ref) => alertRef = ref} />
            <SafeAreaView style={{ marginTop: 10, width: "90%", alignSelf: 'center' }}>
                <OnBoardingHeader title="Service Details" />
                <ScrollView>
                    <Text style={{ marginTop: 30, fontFamily: 'ABRe', fontSize: 16, color: acolors.white }}>You’ll be able to add a description and adjust advanced settings</Text>
                    <CustomTextInput
                        onChangeText={setSname}
                        placeholder={"Service name"}
                        style={{ marginTop: 20 }}
                        value={s_name}

                    />
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <CustomTextInput
                            onChangeText={setSTimeMins}
                            // keyboardType={'numeric'}
                            placeholder={"Duration"}
                            value={s_time_mins}
                            style={{ marginTop: 20 }}

                        />
                        <Text style={{ fontFamily: 'ABRe', fontSize: 15, color: 'white', position: 'absolute', right: 20, alignSelf: 'center', top: 30 }}>mins</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'space-between' }}>
                        {/* <TouchableOpacity
                            disabled={expandList ? true : false}
                            onPress={() => setExpandList(true)}
                            style={{ flexDirection: 'row', width: "42%", paddingVertical: 10, justifyContent: 'space-between', borderWidth: 1, borderColor: 'white', borderRadius: 10, paddingHorizontal: 10 }}>

                            {
                                expandList ?
                                    <FlatList
                                        data={prices}
                                        keyExtractor={(item, index) => index.toString()}
                                        renderItem={({ item, index }) => {
                                            console.log(index)
                                            return (
                                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <TouchableOpacity
                                                        onPress={() => { setExpandList(false) }}
                                                    >
                                                        <Text style={{ fontFamily: 'ABRe', fontSize: 14, color: '#FCFCFC', }}>{item}</Text>
                                                    </TouchableOpacity>
                                                    {
                                                        index == 0 &&
                                                        <TouchableOpacity
                                                            onPress={() => { setExpandList(false) }}
                                                        >
                                                            <CloseDropDown />
                                                        </TouchableOpacity>
                                                    }
                                                </View>
                                            )
                                        }}
                                    />
                                    :
                                    <>
                                        <Text style={{ fontFamily: 'ABRe', fontSize: 14, color: '#FCFCFC', }}>Fixed</Text>
                                        <ArrowDown style={{ marginTop: 5 }} />
                                    </>

                            }
                        </TouchableOpacity> */}
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <CustomTextInput
                                placeholder={"Price"}
                                value={s_price}
                                keyboardType="number-pad"
                                onChangeText={setSPrice}
                                style={{ marginTop: 0, width: "100%" }}
                            />
                            <Text style={{ fontFamily: 'ABRe', fontSize: 15, color: 'white', position: 'absolute', right: 20, alignSelf: 'center', top: 10 }}>$</Text>
                        </View>


                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <CustomTextInput
                            onChangeText={setSDesc}
                            placeholder={"Description"}
                            value={s_desc}
                            style={{ marginTop: 20,height:100,textAlignVertical:'top',paddingTop:15 }}

                        />
                    </View>






                    <MainButton

                        text="Save"
                        btnStyle={{ marginTop: 30 }}
                        onPress={() => {
                            next();
                            // navigate('PaymentMethd') 
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

export default ServiceDetails
