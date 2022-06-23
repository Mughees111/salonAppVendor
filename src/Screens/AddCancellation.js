import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Switch } from 'react-native'
import { goBack, navigate } from '../../Navigations';

import { acolors } from '../Components/AppColors';
import CustomTextInput from '../Components/CustomTextInput';
import PrivacyPicker from '../Components/PrivacyPicker';
import { MainButton } from '../Components/Buttons';
import { ArrowForward, ArrowRight, ChatSendIcon, GroupIcon, NotificationIcon, SearchIcon, VerticalDots, ArrowRight1, ArrowLeft } from '../Components/Svgs';
import { Entypo } from '@expo/vector-icons';
import RNModal from 'react-native-modal'

import { useFocusEffect } from '@react-navigation/native';
import { apiRequest } from '../utils/apiCalls';
import { retrieveItem, useForceUpdate, doConsole, storeItem } from '../utils/functions';
import Loader from '../utils/Loader';
import DropdownAlert from 'react-native-dropdownalert';
import { urls } from '../utils/Api_urls';
import { TextInput } from 'react-native-gesture-handler';

var alertRef;




const AddCancellation = () => {


    const [tabs, setTabs] = useState('list')
    const [isEnabled, setIsEnabled] = useState(false)


    const [mobile_pay, setmobile_pay] = useState('')
    const [userData, setUserData] = useState({});
    const forceUpdate = useForceUpdate();
    const [loading, setLoading] = useState(false);
    const [text, setText] = useState('');



    function addCancellationPolicy() {

        if (!text?.length) {
            alertRef.alertWithType('error', 'Error', 'Cancelation policy cannot be empty');
            return;
        }
        retrieveItem('login_data')
            .then(data1 => {
                const reqObj = {
                    token: data1.token,
                    cancellation_policy: text
                }
                setLoading(true);
                apiRequest(reqObj, 'update_salon')
                    .then(data => {
                        setLoading(false);
                        if (data.action == 'success') {
                            storeItem('login_data', data.data)
                                .then(data => {
                                    alertRef.alertWithType('success', 'Success', "Added");
                                    goBack();
                                })
                        }
                        else {
                            alertRef.alertWithType('error', 'Error', data.error);
                            setLoading(false)
                        }

                    })
                    .catch(err => {
                        setLoading(false)
                        console.log(err)
                    })
            })

    }






    const Header = () => (
        <View style={{ width: "100%", flexDirection: 'row', justifyContent: 'space-between' }} >
            <TouchableOpacity
                onPress={() => goBack()}
                style={{ width: 34, height: 34, borderRadius: 34 / 2, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' }}>
                <ArrowLeft />
            </TouchableOpacity>
            <Text style={{ fontFamily: 'ABRe', fontSize: 20.67, color: 'white' }}>Add Cancelation Policy</Text>
            <View></View>
        </View>
    )


    useEffect(() => {
        setLoading(true)
        retrieveItem('login_data')
            .then(d => {
                setUserData(d)
                setText(d.cancellation_policy);
                console.log(d)
                forceUpdate();
                setLoading(false)
            })


    }, []);


    return (
        <View style={{ flex: 1, backgroundColor: acolors.bgColor }}>
            {loading && <Loader />}
            <DropdownAlert ref={(ref) => alertRef = ref} />
            <StatusBar
                style='light'
                backgroundColor={acolors.bgColor}
                translucent={false}
            // translucent={false}
            />
            <SafeAreaView style={{ marginTop: 10, width: "90%", alignSelf: 'center', flex: 1 }}>
                <Header />
                <CustomTextInput
                    placeholder={"Cancelation Policy"}
                    style={{ height: 200, paddingTop: 10, marginTop: 50, borderWidth: 0.6 }}
                    textAlignVertical='top'
                    onChangeText={setText}
                    value={text}

                />
                <MainButton
                    text="Add"
                    btnStyle={{ position: 'absolute', bottom: 10 }}
                    onPress={() => addCancellationPolicy()}
                />





            </SafeAreaView>


        </View>
    )
}


const styles = StyleSheet.create({
    activeTab: {
        backgroundColor: acolors.primary,
        width: "50%",
        height: 28,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center'
    },
    inActiveTab: {
        backgroundColor: '#1E1F25',
        // 'rgba(255, 255, 255, 0.1)',
        width: "50%",
        height: 28,
        // borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center'
    },
    activeTabText: {
        fontFamily: 'ABRe',
        fontSize: 16,
        color: '#111111'
    },
    inActiveTabText: {
        fontFamily: 'ABRe',
        fontSize: 14,
        color: '#FFFFFF'
    }
})



export default AddCancellation

