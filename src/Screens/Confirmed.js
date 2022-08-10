import React, { useState } from 'react'
import { ArrowLeft, CancelIcon, ChatSendIcon } from '../Components/Svgs';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, TextInput } from 'react-native'
import { goBack, navigate } from '../../Navigations';
import { acolors } from '../Components/AppColors';
import { FlatList } from 'react-native-gesture-handler';
import { MainButton } from '../Components/Buttons';
import RNModal from 'react-native-modal';
import { StatusBar } from 'expo-status-bar';
import { useFocusEffect } from '@react-navigation/native';


import { apiRequest } from '../utils/apiCalls';
import { retrieveItem, useForceUpdate, doConsole } from '../utils/functions';
import Loader from '../utils/Loader';
import DropdownAlert from 'react-native-dropdownalert';


const Confirmed = (props) => {



    const [cancellationModal, setCancellationModal] = useState(false)
    const [userData, setUserData] = useState();

    const params = props?.route?.params;

    useFocusEffect(React.useCallback(
        () => {
            retrieveItem('login_data')
                .then(data => {
                    setUserData(data)
                })
        },
        [],
    ))

    const Header = () => (
        <View style={{ width: "100%", flexDirection: 'row', justifyContent: 'space-between' }} >
            <TouchableOpacity
                onPress={() => goBack()}
                style={{ width: 34, height: 34, borderRadius: 34 / 2, backgroundColor: 'rgba(255,255,255,0.1)', alignItems: 'center', justifyContent: 'center' }}>
                <ArrowLeft />
            </TouchableOpacity>
            <Text style={{ fontFamily: 'ABRe', fontSize: 20.67, color: 'white' }}>Confirmed</Text>
            <TouchableOpacity>
                <Text style={{ fontFamily: 'ABRe', fontSize: 14.67, color: 'white' }}>      </Text>
                {/* Edit */}
            </TouchableOpacity>
        </View>
    )

    const PendingAppintView = () => (
        <View style={{ paddingBottom: 15, borderBottomWidth: 1, borderColor: 'rgba(255,255,255,0.1)', marginTop: 5 }}>
            <View onPress={() => navigate('ClientProfile')} style={{ flexDirection: 'row', marginTop: 15, width: "100%" }}>
                <Image
                    style={{ width: 49, height: 49, borderRadius: 49 / 2 }}
                    source={{ uri: params?.profile_pic }
                        // require('../assets/img1.png')
                    }
                />
                <View style={{ marginLeft: 15 }}>
                    <Text style={{ fontFamily: "ABRe", fontSize: 12.89, color: 'white', lineHeight: 21, }}>{params?.name}</Text>
                    <Text style={{ fontFamily: "ABRe", fontSize: 12.89, color: 'white', lineHeight: 21 }}>{params?.email}</Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', width: "100%", marginTop: 10 }}>
                <View style={{ backgroundColor: '#1E1F25', borderRadius: 2, flexDirection: 'row', width: "100%", }}>
                    <View style={{ height: "100%", width: 10, backgroundColor: "rgba(163, 163, 163, 0.7)", borderTopRightRadius: 6, borderBottomRightRadius: 8 }}></View>
                    <View style={{ marginLeft: 10, alignSelf: 'center', marginVertical: 5, justifyContent: 'space-between' }}>
                        <Text style={{ fontFamily: 'ABRe', fontSize: 9.22, color: 'white', }}>{params?.app_start_time} - {params?.app_end_time} ({params?.app_date})</Text>
                        <Text style={{ fontFamily: 'ABRe', fontSize: 9.22, color: 'white', }}>{params?.app_services}</Text>
                        <Text style={{ fontFamily: 'ABRe', fontSize: 9.22, color: 'white', marginTop: 5 }}>{params?.is_paid == 1 ? "Paid: $" + params?.app_price : "Cash Appointment"}</Text>
                        <Text style={{ fontFamily: 'ABRe', fontSize: 9.22, color: 'white', marginTop: 5,textTransform:'capitalize' }}>Gender: {params?.user_gender}</Text>
                    </View>
                </View>
            </View>
        </View>
    )

    const CancellationModal = () => (
        <RNModal
            backdropColor='rgba(196, 196, 196, 0.3)'
            isVisible={cancellationModal}
            onBackdropPress={() => setCancellationModal(false)}
            style={{ position: 'absolute', bottom: 0, width: "80%", alignSelf: 'center' }}
        >
            <View style={{ backgroundColor: acolors.bgColor, alignItems: 'center', justifyContent: 'center', borderRadius: 10, paddingVertical: 20, paddingHorizontal: 25 }}>
                <Text style={{ fontSize: 20, color: '#FFFFFF', fontFamily: 'ABRe' }}>Appointment Cancellation</Text>
                <MainButton
                    text={"Cancel Appointment"}
                    btnStyle={{ marginTop: 20 }}
                    textStyle={{ fontSize: 11.94 }}

                    onPress={() => {
                        setCancellationModal(false)
                        setTimeout(() => {
                            navigate('CancelAppointment', params)
                        }, 200);

                    }}
                />
                <TouchableOpacity
                    onPress={() => setCancellationModal(false)}
                    style={{ width: "100%", height: 45, borderRadius: 26, marginTop: 20, borderWidth: 1, borderColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontFamily: 'ABRe', fontSize: 11.94, color: 'white' }}>Go Back</Text>
                </TouchableOpacity>
            </View>

        </RNModal>
    )



    return (
        <View style={{ flex: 1, backgroundColor: acolors.bgColor }}>
            <StatusBar
                style='light'
                backgroundColor={acolors.bgColor}
                translucent={false}
            // translucent={false}
            />
            <SafeAreaView style={{ marginTop: 10, width: "90%", alignSelf: 'center' }}>
                <Header />

                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', paddingVertical: 8, backgroundColor: '#1E1F25', borderRadius: 10, marginTop: 20 }}>
                    <View>
                        <Text style={{ fontFamily: 'ABRe', fontSize: 8, color: 'white' }}>Start</Text>
                        <Text style={{ fontFamily: 'ABRe', fontSize: 16, color: 'white' }}>{params?.app_start_time}</Text>
                    </View>
                    <View style={{ width: 1, height: "100%", backgroundColor: 'rgba(255,255,255,0.5)' }}></View>
                    <View>
                        <Text style={{ fontFamily: 'ABRe', fontSize: 8, color: 'white' }}>Date</Text>
                        <Text style={{ fontFamily: 'ABRe', fontSize: 16, color: 'white' }}>{params?.app_date}</Text>
                    </View>
                </View>

                <PendingAppintView />
                {/* <TouchableOpacity style={{ alignSelf: 'flex-end', marginTop: 10 }}>
                    <Text style={{ fontFamily: 'ABRe', color: acolors.primary, fontSize: 15.37, }}>Add to Calender</Text>
                </TouchableOpacity> */}



            </SafeAreaView>
            <View style={{ position: 'absolute', bottom: 50, width: "90%", alignSelf: 'center' }}>


                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderRadius: 10, marginTop: 20 }}>
                    <View>
                        <Text style={{ fontFamily: 'ABRe', fontSize: 8, color: 'white' }}>Total</Text>
                        <Text style={{ fontFamily: 'ABRe', fontSize: 16, color: 'white' }}>${params?.app_price}</Text>
                    </View>
                    <View style={{ width: 1, height: "100%", backgroundColor: 'rgba(255,255,255,0.5)' }}></View>
                    <View>
                        <Text style={{ fontFamily: 'ABRe', fontSize: 8, color: 'white' }}>Due To</Text>
                        <Text style={{ fontFamily: 'ABRe', fontSize: 16, color: 'white' }}>${params?.app_price}</Text>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', marginTop: 15 }}>
                    {/* <TouchableOpacity
                        onPress={() => setCancellationModal(true)}
                    >
                        <CancelIcon />
                    </TouchableOpacity> */}
                    {/* <TouchableOpacity

                        style={{ width: "40%", height: 45, borderRadius: 26, borderWidth: 1, borderColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontFamily: 'ABRe', fontSize: 11.94, color: 'white' }}>Book Again</Text>
                    </TouchableOpacity> */}
                    {
                        params?.is_paid == 0 &&

                        <MainButton
                            text={"Rescheduled"}
                            btnStyle={{ width: "40%", height: 45 }}
                            textStyle={{ fontSize: 11.94, }}
                            onPress={() => {

                                let makeBookedServices = params.app_services.split(",");
                                params.sal_services = userData?.sal_services;
                                doConsole(makeBookedServices);
                                for (let i = 0; i < userData?.sal_services.length; i++) {
                                    if (makeBookedServices.includes(userData?.sal_services[i].s_name)) {
                                        params.sal_services[i].isAdded = true;
                                    }
                                }
                                // doConsole(params)
                                navigate('SeeAllServices', params)

                            }}
                        // navigate('CheckOut', params)}
                        />
                    }

                </View>

            </View>
            <CancellationModal />
        </View>

    )
}

export default Confirmed
