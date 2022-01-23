import React from 'react'
import { ArrowLeft, CancelIcon, ChatSendIcon } from '../Components/Svgs';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, TextInput } from 'react-native'
import { goBack, navigate } from '../../Navigations';
import { acolors } from '../Components/AppColors';
import { FlatList } from 'react-native-gesture-handler';
import { MainButton } from '../Components/Buttons';


const CheckOut = (props) => {


    const Header = () => (
        <View style={{ width: "100%", flexDirection: 'row', justifyContent: 'space-between' }} >
            <TouchableOpacity
                onPress={() => goBack()}
                style={{ width: 34, height: 34, borderRadius: 34 / 2, backgroundColor: 'rgba(255,255,255,0.1)', alignItems: 'center', justifyContent: 'center' }}>
                <ArrowLeft />
            </TouchableOpacity>
            <Text style={{ fontFamily: 'ABRe', fontSize: 20.67, color: 'white' }}>Checkout</Text>
            <View></View>
        </View>
    )
    const params = props?.route?.params;

    const PendingAppintView = () => (
        <View style={{ paddingBottom: 15, marginTop: 5 }}>
            <View onPress={() => navigate('ClientProfile')} style={{ flexDirection: 'row', marginTop: 15, width: "100%" }}>
                <Image
                    style={{ width: 49, height: 49, borderRadius: 49 / 2 }}
                    source={require('../assets/img1.png')}
                />
                <View style={{ marginLeft: 15 }}>
                    <Text style={{ fontFamily: "ABRe", fontSize: 12.89, color: 'white', lineHeight: 21, }}>{params?.name}</Text>
                    <Text style={{ fontFamily: "ABRe", fontSize: 12.89, color: 'white', lineHeight: 21 }}>{params?.email}</Text>
                </View>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 14, paddingVertical: 8, backgroundColor: '#1E1F25', borderRadius: 10, marginTop: 20 }}>
                <View>
                    {/* <Text style={{ fontFamily: 'ABRe', fontSize: 8, color: 'white' }}>Today</Text> */}
                    <Text style={{ fontFamily: 'ABRe', fontSize: 16, color: 'white' }}>{params?.app_date}</Text>
                    <Text style={{ fontFamily: 'ABRe', fontSize: 16, color: 'white' }}>{params?.app_start_time}</Text>
                </View>
                <View style={{ width: 1, height: "100%", backgroundColor: 'rgba(255,255,255,0.5)' }}></View>
                <View>
                    <Text style={{ fontFamily: 'ABRe', fontSize: 8, color: 'white', color: '#58FF49' }}>Confirmed</Text>
                    <Text style={{ fontFamily: 'ABRe', fontSize: 16, color: 'white' }}>{params?.app_services}</Text>
                    <Text style={{ fontFamily: 'ABRe', fontSize: 16, color: 'white' }}>{params?.app_est_duration}min</Text>
                </View>
            </View>

            <View style={{ flexDirection: 'row', width: "100%", marginTop: 10 }}>
                <View style={{ backgroundColor: '#1E1F25', borderRadius: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10, width: "100%", paddingVertical: 20 }}>

                    <View style={{ alignSelf: 'center' }}>
                        <Text style={{ fontFamily: 'ABRe', fontSize: 14, color: 'white', }}>{params?.app_services} {params?.app_est_duration}min</Text>
                        <Text style={{ fontFamily: 'ABRe', fontSize: 14, color: 'white', }}>{params?.app_date}, {params?.app_start_time}, {params?.name} </Text>
                    </View>
                    <Text style={{ fontFamily: 'ABRe', fontSize: 14, color: 'white', }}>${params?.app_price}</Text>
                </View>
            </View>
        </View>
    )


    return (
        <View style={{ flex: 1, backgroundColor: acolors.bgColor }}>
            <SafeAreaView style={{ marginTop: 35, width: "90%", alignSelf: 'center' }}>
                <Header />
                <PendingAppintView />
            </SafeAreaView>
            <View style={{ position: 'absolute', bottom: 50, width: '90%', alignSelf: 'center' }}>
                <MainButton
                    text={"Continue"}
                    btnStyle={{ width: "100%", height: 45 }}
                    textStyle={{ fontSize: 11.94, }}
                    onPress={() => navigate('CheckOut2')}
                />
            </View>
        </View>

    )
}

export default CheckOut
