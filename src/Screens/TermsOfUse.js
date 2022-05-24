import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useEffect, useState } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image, SafeAreaView, FlatList, Dimensions, Alert, ScrollView, Switch } from 'react-native'
import DropdownAlert from 'react-native-dropdownalert';
import { acolors } from '../Components/AppColors';
import { OnBoardingHeader } from '../Components/Header';
import { apiRequest } from '../utils/apiCalls';
import Loader from '../utils/Loader';


var alertRef;

const TermsOfUse = () => {

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState('');


    function getPage() {
        const postObj = { slug : "terms-and-conditions" }
        setLoading(true)
        apiRequest(postObj, 'get_page')
            .then(data => {
                setLoading(false)
                if (data?.action == 'success') {
                    setData(data.data?.content);
                }
                else {
                    alertRef.alertWithType('error', 'Error', data?.error);
                };
            })
            .catch(err => {
                setLoading(false)
            })
    }

    useEffect(()=>{
        getPage()
    },[])

    return (
        <View style={{ flex: 1, backgroundColor: acolors.bgColor }}>

            <StatusBar
                style='light'
                translucent={false}
                backgroundColor={acolors.bgColor}
            // translucent={false}
            />
            <SafeAreaView style={{ flex: 1, marginTop: 10 }}>
                <View style={{ paddingHorizontal: 20 }}>
                    <OnBoardingHeader title="Term of Use" />
                    <Text style={{ marginTop: 20, fontFamily: 'ABRe', fontSize: 13, color: 'white', lineHeight: 21.5 }}>{data}</Text>
                </View>
            </SafeAreaView>
            {loading && <Loader />}
            <DropdownAlert ref={(ref) => alertRef = ref} />

        </View>
    )
}

export default TermsOfUse
