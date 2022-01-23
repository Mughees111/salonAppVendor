import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, FlatList, Alert } from 'react-native'
import { goBack, navigate } from '../../Navigations';
import { ArrowLeft, ArrowRight1, CameraIcon, CrossIcon, FbIcon, GoogleIcon, PlusCircle, PlusIcon } from '../Components/Svgs';
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
const AddServices = () => {


    const [canNext, setCanNext] = useState(false)
    const [services, setServices] = useState([])
    const [loading, setLoading] = useState(false)

    const ServicesView = ({ title, time, price }) => (
        <TouchableOpacity
            onPress={() => navigate('ServiceDetails')}
            activeOpacity={0.8}
            style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
            <TouchableOpacity style={{ padding: 5, paddingLeft: 0 }}>
                <CrossIcon />
            </TouchableOpacity>
            <View style={{ marginLeft: 10 }}>
                <Text style={{ color: 'rgba(255,255,255,1)', fontSize: 15, fontFamily: 'ABRe' }}>{title}</Text>
                <Text style={{ color: 'rgba(255,255,255,1)', fontSize: 12, fontFamily: 'ABRe', marginTop: 2 }}>{time}</Text>
            </View>
            <View style={{ position: 'absolute', right: 0, flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ marginRight: 30, color: 'rgba(255,255,255,1)', fontFamily: 'ABRe', fontSize: 15 }}>{price}</Text>
                <ArrowRight1 />
            </View>

        </TouchableOpacity >
    )

    function del(id) {

        setLoading(true)
        retrieveItem('login_data')
            .then(data => {
                console.log(data)
                apiRequest({ id: id, token: data.token }, 'del_salon_service')
                    .then(data => {
                        if (data.action == 'success') {
                            setLoading(false)
                            alertRef.alertWithType('success', 'Success', 'DELETED');
                            setServices(data.data.sal_services);
                            storeItem('login_data', data.data)
                            if (data.data.sal_services.length) {
                                setCanNext(true);
                            }
                            else {
                                setCanNext(false);
                            }
                        }
                    })
                    .catch(err => {
                        setLoading(false)
                    })
            })

    }

    useFocusEffect(React.useCallback(
        () => {
            retrieveItem('login_data')
                .then(data => {
                    if(data.sal_hours.length<1){
                        Alert.alert('i have no sal hours')
                        return
                    }
                    if (data.sal_services.length) {
                        setServices(data.sal_services);
                        setCanNext(true);
                    }
                    else setCanNext(false);
                })
        },
        [],
    ))
    React.useEffect(() => {
        console.log(canNext)
        return () => {

        }
    }, [])


    return (
        <View style={{ flex: 1, backgroundColor: '#111111' }}>
            <StatusBar
                style="light"
                backgroundColor="#111111"
                translucent={false}
            />
            {loading && <Loader />}
            <DropdownAlert ref={(ref) => alertRef = ref} />
            <SafeAreaView style={{ marginTop: 10, width: "90%", alignSelf: 'center' }}>
                <OnBoardingHeader title="Add Services" />
                {/* <ScrollView> */}
                {!services.length &&
                    <Text style={{ marginTop: 30, fontFamily: 'ABRe', fontSize: 16, color: acolors.white, marginBottom: 10 }}>Add at least one service now</Text>
                }
                {/* <ServicesView title="Mens’s New Hair Cut" time="25 - 30 mins" price="$50" />
                    <ServicesView title="Men Skin Polish" time="15 - 20 mins" price="$40" />
                    <ServicesView title="Oil Treatment" time="10 - 20 mins" price="$35" />
                    <ServicesView title="Peaceful Massage" time="45 - 50 mins" price="$90" /> */}

                <FlatList
                    data={services}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => navigate('ServiceDetails', item)}
                            activeOpacity={0.8}
                            style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
                            <TouchableOpacity
                                onPress={() => del(item.id)}
                                style={{ padding: 5, paddingLeft: 0 }}>
                                <CrossIcon />
                            </TouchableOpacity>
                            <View style={{ marginLeft: 10 }}>
                                <Text style={{ color: 'rgba(255,255,255,1)', fontSize: 15, fontFamily: 'ABRe' }}>{item.s_name}</Text>
                                <Text style={{ color: 'rgba(255,255,255,1)', fontSize: 12, fontFamily: 'ABRe', marginTop: 2 }}>{item.s_time_mins} mins</Text>
                            </View>
                            <View style={{ position: 'absolute', right: 0, flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ marginRight: 30, color: 'rgba(255,255,255,1)', fontFamily: 'ABRe', fontSize: 15 }}>${item.s_price}</Text>
                                {/* <ArrowRight1 /> */}
                            </View>

                        </TouchableOpacity >
                    )}
                />
                <TouchableOpacity
                    onPress={() => navigate('ServiceDetails')}
                    style={{ flexDirection: 'row', marginTop: 25, alignItems: 'center' }}>
                    <PlusIcon />
                    <Text style={{ color: 'rgba(252, 252, 252, 1)', fontSize: 14, fontFamily: 'ABRe', marginLeft: 5 }}>Add Service</Text>
                </TouchableOpacity>
                {/* </ScrollView> */}
            </SafeAreaView>
            <MainButton
                text="Continue"
                disabled={canNext ? false : true}
                btnStyle={{ position: 'absolute', bottom: 100, width: "90%", alignSelf: 'center', backgroundColor: canNext ? 'rgba(226, 179, 120, 1)' : 'rgba(226, 179, 120, 0.4)' }}
                onPress={() => {
                    navigate('Congrats')
                    // navigate('PaymentMethd') 
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

export default AddServices
