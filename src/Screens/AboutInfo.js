import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native'
import { goBack, navigate } from '../../Navigations';
import { ArrowLeft, ArrowRight, FbIcon, GoogleIcon } from '../Components/Svgs';
import { acolors } from '../Components/AppColors';
import CustomTextInput from '../Components/CustomTextInput';
import PrivacyPicker from '../Components/PrivacyPicker';
import { MainButton } from '../Components/Buttons';
import { OnBoardingHeader } from '../Components/Header';
import { retrieveItem, storeItem } from "../utils/functions";
import Loader from '../utils/Loader';
import DropdownAlert from 'react-native-dropdownalert';

var alertRef;
const AboutInfo = () => {

    const [sal_name, setSalName] = useState('');
    const [sal_contact_person, setSalContactPerson] = useState('');
    const [sal_phone, setSalPhone] = useState('');
    const [loading, setLoading] = useState(false);
    const [sal_type, setSaltype] = useState('');
    const [sal_description, setSal_description] = useState('')


    function next() {

        if (sal_name.length < 2) {
            alertRef.alertWithType("error", "Error", "Please provide a valid salon name");
            return;
        }
        if (sal_contact_person.length < 2) {
            alertRef.alertWithType("error", "Error", "Please provide a valid name");
            return;
        }
        if (sal_phone.length < 10) {
            alertRef.alertWithType("error", "Error", "Please provide a valid 10 digit phone");
            return;
        }
        if (sal_type == '') {
            alertRef.alertWithType("error", "Error", "Please provide a valid salon type");
            return;
        }
        retrieveItem('login_data')
            .then(data => {
                var data1 = data;
                data1.step = 2;
                data1.sal_name = sal_name;
                data1.sal_contact_person = sal_contact_person;
                data1.sal_phone = sal_phone;
                data1.sal_type = sal_type;
                data1.sal_description = sal_description;
                storeItem('login_data', data1)
                    .then(data => {
                        navigate('PasswordSetup')
                    });
            });



    }

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
                <OnBoardingHeader title="About You" />
                <ScrollView>
                    <Text style={{ marginTop: 30, fontFamily: 'ABRe', fontSize: 16, color: acolors.white }}>Tell us more about yourself and your saloon</Text>
                    <CustomTextInput
                        placeholder="Saloon Name"
                        style={{ marginTop: 20 }}
                        onChangeText={setSalName}
                    />
                    <CustomTextInput
                        placeholder="Your Name"
                        style={{ marginTop: 20 }}
                        onChangeText={setSalContactPerson}
                    />
                    <CustomTextInput
                        placeholder="Description (Optional) "
                        style={{ marginTop: 20 }}
                        onChangeText={setSal_description}
                    />

                    <View style={{ width: "100%", height: 42, marginTop: 15, borderWidth: 1, borderColor: '#FCFCFC', borderRadius: 8, alignItems: 'center', justifyContent: 'center' }}>
                        <PrivacyPicker
                            selected={{ title: "Salon type" }}
                            data={[{ title: "Men" }, { title: "Women" }]}
                            onValueChange={(index, title) => {
                                setSaltype(title.title)
                            }}
                        />
                    </View>

                    <View style={{ flexDirection: 'row', }}>
                        <View style={{ width: "17%", height: 42, marginTop: 15, borderWidth: 1, borderColor: '#FCFCFC', borderRadius: 8, alignItems: 'center', justifyContent: 'center' }}>
                            {/* <Text>92</Text> */}
                            <PrivacyPicker
                                selected={{ title: "+1" }}
                                data={{ title: "+1" }}
                                onValueChange={(index, title) => {
                                    // setCondition(title.title)
                                }}
                            />
                        </View>
                        <CustomTextInput
                            placeholder="Phone Number"
                            keyboardType={'numeric'}
                            style={{ marginLeft: "3%", width: "79%", marginTop: 15, }}
                            onChangeText={setSalPhone}
                        />
                    </View>
                    <MainButton
                        text="Continue"
                        btnStyle={{ marginTop: 30 }}
                        onPress={() => {
                            next()
                            // navigate('PasswordSetup') 
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

export default AboutInfo
