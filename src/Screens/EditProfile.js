import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Dimensions } from 'react-native'
import { goBack, navigate } from '../../Navigations';
import { ArrowLeft, ArrowRight, FbIcon, GoogleIcon, PlusCircle } from '../Components/Svgs';
import { acolors } from '../Components/AppColors';
import CustomTextInput from '../Components/CustomTextInput';
import PrivacyPicker from '../Components/PrivacyPicker';
import { MainButton } from '../Components/Buttons';
import { OnBoardingHeader } from '../Components/Header';



import { apiRequest } from '../utils/apiCalls';
import { retrieveItem, useForceUpdate, doConsole, storeItem } from '../utils/functions';
import Loader from '../utils/Loader';
import DropdownAlert from 'react-native-dropdownalert';

var alertRef;





const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

const EditProfile = (props) => {


    const [loading, setLoading] = useState(false);

    const forceUpdate = useForceUpdate();

    const params = props?.route?.params;

    const [editProfileData, setEditProfileData] = useState({
        sal_name: params?.sal_name ? params?.sal_name : '',
        sal_contact_person: params?.sal_contact_person ? params?.sal_contact_person : '',
        sal_address: params?.sal_address ? params?.sal_address : '',
        sal_description: params?.sal_description ? params?.sal_description : '',
    })



    function next() {

        if (editProfileData.sal_name.length < 3) {
            alertRef.alertWithType("error", "Error", "Please provide a valid salon name");
            return;
        }
        if (editProfileData.sal_contact_person.length < 3) {
            alertRef.alertWithType("error", "Error", "Please provide a valid salon contact person");
            return;
        }
        if (editProfileData.sal_address.length < 3) {
            alertRef.alertWithType("error", "Error", "Please provide a valid salon address");
            return;
        }

        retrieveItem('login_data')
            .then(data1 => {
                const reqObj = {
                    sal_name: editProfileData.sal_name,
                    sal_contact_person: editProfileData.sal_contact_person,
                    sal_address: editProfileData.sal_address,
                    sal_description: editProfileData.sal_description,
                    token: data1.token
                }
                setLoading(true)
                apiRequest(reqObj, 'update_salon')
                    .then(data => {
                        setLoading(false);
                        if (data.action == 'success') {

                            alertRef.alertWithType("success", "Success");
                            storeItem('login_data', data.data);
                            setTimeout(() => {
                                goBack();
                            }, 800);
                            // setSalData(data.data);
                            // clean up states

                        }
                        else {
                            alertRef.alertWithType("error", "Error", data.error);
                            setLoading(false);
                        }

                    })
                    .catch(err => {
                        setLoading(false)
                        doConsole('error is this')
                        console.log(err)
                    })
            })




    }

    useEffect(() => {
        if (!props?.route?.params?.sal_id) {
            goBack();
        }
    }, [])


    return (
        <View style={{ flex: 1, backgroundColor: '#111111' }}>
            <StatusBar
                style='light'
                backgroundColor={acolors.bgColor}
                translucent={false}
            // translucent={false}
            />
            {loading && <Loader />}
            <DropdownAlert ref={(ref) => alertRef = ref} />
            <SafeAreaView style={{ marginTop: 10, width: "90%", alignSelf: 'center' }}>
                <OnBoardingHeader title="Edit Profile" />
                <ScrollView>

                    <Text style={{ fontFamily: 'ABRe', fontSize: 16, color: acolors.white, marginTop: 25 }}>Salon name</Text>
                    <CustomTextInput
                        value={editProfileData.sal_name}
                        placeholder={"Salon name"}
                        onChangeText={(v) => {
                            setEditProfileData({
                                ...editProfileData,
                                sal_name: v
                            })
                        }}
                        style={{ marginTop: 10 }}
                    />

                    <Text style={{ fontFamily: 'ABRe', fontSize: 16, color: acolors.white, marginTop: 25 }}>Salon contact person</Text>
                    <CustomTextInput
                        placeholder={"Salon contact person"}
                        value={editProfileData.sal_contact_person}
                        onChangeText={(v) => {
                            setEditProfileData({
                                ...editProfileData,
                                sal_contact_person: v
                            })
                        }}

                    />

                    <Text style={{ fontFamily: 'ABRe', fontSize: 16, color: acolors.white, marginTop: 25 }}>Description</Text>
                    <CustomTextInput
                        placeholder={"Salon description"}
                        value={editProfileData.sal_description}
                        onChangeText={(v) => {
                            setEditProfileData({
                                ...editProfileData,
                                sal_description: v
                            })
                        }}

                    />
                    <Text style={{ fontFamily: 'ABRe', fontSize: 16, color: acolors.white, marginTop: 25 }}>Salon address</Text>
                    <CustomTextInput
                        placeholder={"Salon address"}
                        value={editProfileData.sal_address}
                        onChangeText={(v) => {
                            setEditProfileData({
                                ...editProfileData,
                                sal_address: v
                            })
                        }}
                        style={{ marginTop: 10 }}

                    />


                    <MainButton
                        text="Save"
                        btnStyle={{ marginTop: 40 }}
                        onPress={() => {
                            next();

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

export default EditProfile


