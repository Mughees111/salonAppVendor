import { StatusBar } from 'expo-status-bar';
import React, { useContext, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Alert } from 'react-native'
import { goBack, navigate } from '../../Navigations';
import { acolors } from '../Components/AppColors';
import { TextInput } from 'react-native-gesture-handler';
import CustomTextInput from '../Components/CustomTextInput';
import PrivacyPicker from '../Components/PrivacyPicker';
import { MainButton } from '../Components/Buttons';

import { Ionicons } from '@expo/vector-icons';



import { apiRequest } from '../utils/apiCalls';
import { retrieveItem, useForceUpdate, doConsole, update_dp, update_dp_2, storeItem, validateEmail } from '../utils/functions';
import Loader from '../utils/Loader';
import DropdownAlert from 'react-native-dropdownalert';
import { Context } from '../Context/DataContext';
import { changeLoggedIn } from '../../Common';

var alertRef

const Support = () => {

    const forceUpdate = useForceUpdate();
    const { state, setUserGlobal } = useContext(Context);
    const [loading, setLoading] = useState(false);

    const userData = state.userData;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [reason, setReason] = useState('');
    const [description, setDescription] = useState('')



    function doDel() {

        retrieveItem('login_data')
            .then(data => {


                const reqObj = {
                    sal_email: email,
                    sal_password: password,
                    token: data?.token,
                    reason,
                    description
                }
                if (!validateEmail(email)) {
                    alertRef.alertWithType('error', "Error", "Please enter a valid email")
                    return
                }
                if (!password.length) {
                    alertRef.alertWithType('error', "Error", "Please enter a valid password")
                    return
                }
                if (!reason.length) {
                    alertRef.alertWithType('error', "Error", "Please enter a valid reason")
                    return
                }
                if (!description.length) {
                    alertRef.alertWithType('error', "Error", "Please enter a valid Description")
                    return
                }

                setLoading(true)
                apiRequest(reqObj, 'delete_vendor_account')
                    .then(data => {
                        setLoading(false)
                        if (data.action == 'success') {
                            storeItem('login_data', '')
                            changeLoggedIn.changeNow(2);
                        }
                        else alertRef.alertWithType('error', "Error", data.error);
                    })
                    .catch(err => {
                        setLoading(false)
                    })
            })
    }





    const Header = ({ title }) => {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
                <TouchableOpacity
                    onPress={() => goBack()}
                    style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontFamily: 'ABRe', fontSize: 14, color: '#F9F2BC' }}>Cancel</Text>
                </TouchableOpacity>
                <Text style={{ fontFamily: 'ABRe', fontSize: 16, color: acolors.white }}>Support</Text>
                <TouchableOpacity
                    onPress={() => {
                        alertRef.alertWithType('warn',"Under Development")
                        // doDel()
                    }}
                >
                    <Text style={{ fontFamily: 'ABRe', fontSize: 14, color: '#F9F2BC' }}>Send</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'black' }}>
            {loading && <Loader />}
            <DropdownAlert ref={(ref) => alertRef = ref} />

            <StatusBar
                style='light'
                backgroundColor={acolors.bgColor}
                translucent={false}
            />

            <SafeAreaView style={{ marginTop: 10, width: "90%", alignSelf: 'center' }}>
                <Header />

                <View style={{ marginTop: 20, alignSelf: 'center', width: "100%" }}>
                    <View style={{ width: "100%", backgroundColor: "#222222", borderRadius: 2, paddingVertical: 20, paddingHorizontal: 10 }}>
                        <Text style={{ fontFamily: 'ABRe', fontSize: 11, color: 'rgba(255,255,255,0.4)', flexWrap: 'wrap', marginTop: 0, width: "100%" }}>You can send us a support request here, or email us directly at <Text>support@thecut.co.</Text> We will respond to you via email as soon as possible.</Text>
                    </View>
                </View>
                <ScrollView>

                    <Text style={{ fontFamily: 'ABRe', fontSize: 16, color: acolors.white, marginTop: 12 }}>Email</Text>
                    <View style={{ marginTop: 2, width: "100%", backgroundColor: '#222222', }}>
                        <TextInput
                            placeholder='Please provide the best email to reach you '
                            // value={username}
                            onChangeText={setEmail}
                            autoCapitalize="none"
                            placeholderTextColor={"rgba(255,255,255,0.4)"}
                            style={{
                                width: "98%",
                                alignSelf: 'center',
                                height: 45,
                                // borderRadius: 3,
                                // borderWidth: 1,
                                borderBottomWidth: 0.5,
                                // borderColor: acolors.white,
                                color: acolors.white,
                                fontFamily: 'ABRe',
                                fontSize: 14,
                                paddingHorizontal: 10,

                            }}
                        />
                    </View>

                    <Text style={{ fontFamily: 'ABRe', fontSize: 16, color: acolors.white, marginTop: 12 }}>Description</Text>
                    <View style={{ marginTop: 2, width: "100%", backgroundColor: '#222222', }}>
                        <TextInput
                            placeholder='Please provide a detailed description of what you are experiencing or any questions you may have so that we can best assist you.'
                            multiline={true}
                            // value={username}
                            onChangeText={setDescription}
                            placeholderTextColor={"rgba(255,255,255,0.4)"}
                            textAlignVertical='top'
                            style={{
                                width: "100%",
                                minHeight: 70,
                                maxHeight:120,
                                marginTop: 5,
                                // borderRadius: 3,
                                // borderWidth: 1,

                                // borderColor: acolors.white,
                                color: acolors.white,
                                fontFamily: 'ABRe',
                                fontSize: 14,
                                paddingHorizontal: 10,
                            }}
                        />
                    </View>



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

export default Support
