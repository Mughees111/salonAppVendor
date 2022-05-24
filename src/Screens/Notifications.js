import React, { useEffect, useState } from 'react'
import { ArrowLeft, ChatSendIcon } from '../Components/Svgs';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, TextInput, RefreshControl } from 'react-native'
import { goBack, navigate, navigateFromStack } from '../../Navigations';
import { acolors } from '../Components/AppColors';
import { FlatList } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';


import { apiRequest } from '../utils/apiCalls';
import { retrieveItem, useForceUpdate, doConsole, storeItem, update_dp, sqlDateTimeToJSDate } from '../utils/functions';
import Loader from '../utils/Loader';
import DropdownAlert from 'react-native-dropdownalert';



var alertRef;

const Notifications = () => {

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [refreshing, setRefreshing] = React.useState(false);


    function get_notifs(date) {
        setLoading(true)
        retrieveItem('login_data')
            .then(data => {
                apiRequest({ token: data.token, vendor: true }, 'get_notifs')
                    .then(data1 => {
                        setLoading(false)
                        setRefreshing(false)
                        if (data1?.action == 'success') {
                            setData(data1.data)
                            forceUpdate();
                        }
                        else {
                            alertRef.alertWithType("error", "Error", data.error);
                        }

                    })
                    .catch(err => {
                        setLoading(false)
                    })
            })
    }

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        get_notifs()
    }, []);



    useEffect(() => {
        get_notifs();
    }, [])


    const Header = () => (
        <View style={{ width: "100%", flexDirection: 'row', justifyContent: 'space-between' }} >
            <TouchableOpacity
                onPress={() => goBack()}
                style={{ width: 34, height: 34, borderRadius: 34 / 2, backgroundColor: 'rgba(255,255,255,0.1)', alignItems: 'center', justifyContent: 'center' }}>
                <ArrowLeft />
            </TouchableOpacity>
            <Text style={{ fontFamily: 'ABRe', fontSize: 20.67, color: 'white' }}>Notifications</Text>
            <TouchableOpacity
                onPress={() => navigate('UserChatNavigatorr')}
            >
                <ChatSendIcon />
            </TouchableOpacity>
        </View>
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
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                    contentContainerStyle={{ paddingBottom: 100 }}
                    style={{ marginTop: 10 }}
                    showsVerticalScrollIndicator={false}
                >
                    {

                        data.map((item, index) => {
                            return (
                                <TouchableOpacity
                                    activeOpacity={item.screen?0:1}
                                    onPress={() => {
                                        const date = item.date_time.split(' ');
                                        item.screen && navigate(item.screen,{
                                            date : date[0]
                                        })
                                    }}
                                    style={{ width: "100%", paddingVertical: 12, paddingHorizontal: 15, marginTop: 12, backgroundColor: 'black', borderRadius: 10 }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Text style={{ fontFamily: 'ABRe', fontSize: 14.62, color: acolors.primary }}>{item?.title}</Text>
                                        <Text style={{ fontFamily: 'ABRe', fontSize: 7, color: 'white', marginLeft: 10 }}>{item?.ago}</Text>
                                    </View>
                                    <Text style={{ fontFamily: 'ABRe', fontSize: 10.96, color: 'white', lineHeight: 14, marginTop: 3 }}>{item?.description}</Text>
                                </TouchableOpacity>
                            )
                        })
                    }



                </ScrollView>

            </SafeAreaView>
            {loading && !refreshing && <Loader />}
            <DropdownAlert ref={(ref) => alertRef = ref} />
        </View>

    )
}

export default Notifications
