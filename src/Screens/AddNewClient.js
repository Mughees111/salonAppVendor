import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, TextInput, Dimensions } from 'react-native'
import { goBack, navigate } from '../../Navigations';

import { acolors } from '../Components/AppColors';
import CustomTextInput from '../Components/CustomTextInput';
import PrivacyPicker from '../Components/PrivacyPicker';
import { MainButton } from '../Components/Buttons';
import { ArrowForward, ArrowRight, ChatSendIcon, GroupIcon, NotificationIcon, SearchIcon, ArrowLeft, MsgIcon, CallIcon, MailIcon, ArrowRight1, PlusIcon, PlusCircle, PlusIcon1, ArrowDown, CameraIcon2, ProfileOutline } from '../Components/Svgs';
import { Entypo } from '@expo/vector-icons';

import { useFocusEffect } from '@react-navigation/native';
import { apiRequest } from '../utils/apiCalls';
import {
    retrieveItem, useForceUpdate, doConsole, storeItem, validateEmail
} from '../utils/functions';
import Loader from '../utils/Loader';
import DropdownAlert from 'react-native-dropdownalert';
import { urls } from '../utils/Api_urls';

var alertRef;



const AddNewClient = () => {

    const forceUpdate = useForceUpdate();
    const [loading, setLoading] = useState(false);

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [userId, setUserId] = useState('');
    const [profilePic, setProfilePic] = useState('');
    const [selectUserObj, setSelectUserObj] = useState({});
    const [userData, setUserData] = useState({});
    const [showPass, setShowPass] = useState(true);

    const [clients, setSalClients] = useState([]);

    const Header = () => (
        <View style={{ width: "100%", flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} >
            <TouchableOpacity
                onPress={() => goBack()}
                style={{ width: 34, height: 34, borderRadius: 34 / 2, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' }}>
                <ArrowLeft />
            </TouchableOpacity>
            <Text style={{ fontFamily: 'ABRe', fontSize: 20.67, color: 'white', marginTop: -15 }}>Add New Client</Text>
            <View></View>

        </View>
    )

    function get_sal_clients() {
        setLoading(true)
        retrieveItem('login_data')
            .then(data => {
                setUserData(data)
                apiRequest({ token: data.token }, 'get_sal_clients')
                    .then(data1 => {
                        setLoading(false)
                        if (data1.action == 'success') {
                            var arr = [];
                            let data2 = data1.data
                            arr = [];

                            for (let key in data2) {
                                arr.push({
                                    address: data2[key].address,
                                    email: data2[key].email,
                                    id: data2[key].id,
                                    name: data2[key].name,
                                    phone: data2[key].phone,
                                    profile_pic: data2[key].profile_pic,
                                    title: data2[key].name,
                                    username: data2[key].username,
                                })
                            }
                            doConsole('arr')
                            doConsole(arr)
                            setSalClients(arr)
                            forceUpdate();
                        }
                        else {
                            // alertRef.alertWithType("error", "Error", data.error);
                        }

                    })
                    .catch(err => {
                        console.log(err)
                        setLoading(false)
                    })
            })
    }

    function doNext() {


        var e = email;
        e = e.trim();

        
        if (username.length < 3) {
            alertRef.alertWithType("error", "Error", "Please provide a valid username");
            return;
        }




        if (!validateEmail(e)) {
            alertRef.alertWithType("error", "Error", "Please provide a valid email address");
            return;

        }

        if (password.length < 8) {
            alertRef.alertWithType("error", "Error", "Please provide at least 8 characters as client password");

            return;
        }


        setLoading(true)
        var dbData = {
            email: e,
            username,
            password,
            phone,
            added_by : userData.sal_id
        };
        doConsole(" I request @ " + urls.API + "signup");
        doConsole(dbData);
        apiRequest(dbData, 'signup')
            .then(data => {
                if (data.action == 'success') {
                    const myObj = {
                        username: data.data.username,
                        profile_pic: data.data.profile_pic,
                        email: data.data.email,
                        phone: data.data.phone,
                        id: data.data.id,
                        
                    }
                    doConsole('myObj = ')
                    doConsole(myObj)
                    navigate('NewAppoint', myObj)
                }
                else {
                    setLoading(false)
                    alertRef.alertWithType("error", "Error", data.error);
                }
            })
            .catch(err => {
                console.log(err)
            })

    }



    useFocusEffect(React.useCallback(() => {
        get_sal_clients()
    }, []))
    return (
        <View style={{ flex: 1, backgroundColor: acolors.bgColor }}>
            <StatusBar
                style='light'
                backgroundColor={acolors.bgColor}
                translucent={false}
            // translucent={false}
            />
            {loading && <Loader />}
            <DropdownAlert ref={(ref) => alertRef = ref} />

            <SafeAreaView style={{ marginTop: 10, }}>
                <View style={{ width: "90%", alignSelf: 'center' }}>
                    <Header />
                </View>

                <ScrollView
                    contentContainerStyle={{ paddingBottom: 100 }}
                    style={{ marginTop: 10 }}>
                    <View style={{ width: "90%", alignSelf: 'center' }}>
                        <View style={{ width: "100%", height: 42, marginTop: 10, borderWidth: 1, borderColor: '#FCFCFC', borderRadius: 8, alignItems: 'center', justifyContent: 'center' }}>
                            <PrivacyPicker
                                selected={{ title: "Search your client" }}
                                data={clients}
                                onValueChange={(index, title) => {
                                    doConsole(title)
                                    setEmail(title.email)
                                    setUsername(title.username)
                                    setPhone(title.phone)
                                    setName(title.name)
                                    setUserId(title.id)
                                    setProfilePic(title.profile_pic)
                                    setSelectUserObj(title)
                                    forceUpdate();
                                    doConsole(title);
                                }}
                            />
                        </View>
                        {/* 
                        <TouchableOpacity
                            // onPress={() => navigate('ClientProfile')}
                            style={{ width: 99, height: 94, borderRadius: 6, backgroundColor: '#C4C4C4', alignItems: 'center', justifyContent: 'center', marginTop: 15, alignSelf: 'center' }}
                        >
                            <ProfileOutline />
                            <View style={{ position: 'absolute', bottom: -6, right: -6, width: 22, height: 22, borderRadius: 11, backgroundColor: acolors.white, alignItems: 'center', justifyContent: 'center' }}>
                                <CameraIcon2 />
                            </View>
                        </TouchableOpacity> */}


                        <Text style={{ fontFamily: 'ABRe', fontSize: 14, color: '#FCFCFC', marginTop: 10 }}>Username</Text>
                        <CustomTextInput
                            onChangeText={setUsername}
                            placeholder="Username"
                            value={username}
                        // style={{ marginTop: 20 }}
                        />
                        <Text style={{ fontFamily: 'ABRe', fontSize: 14, color: '#FCFCFC', marginTop: 10 }}>Email</Text>
                        <CustomTextInput
                            onChangeText={setEmail}
                            placeholder="Email"
                            keyboardType={"email-address"}
                            value={email}
                        // style={{ marginTop: 20 }}
                        />
                        <Text style={{ fontFamily: 'ABRe', fontSize: 14, color: '#FCFCFC', marginTop: 10 }}>Phone</Text>
                        <View style={{ flexDirection: 'row', }}>
                            <View style={{ width: "17%", height: 42, marginTop: 10, borderWidth: 1, borderColor: '#FCFCFC', borderRadius: 8, alignItems: 'center', justifyContent: 'center' }}>
                                <PrivacyPicker
                                    selected={{ title: "+1" }}
                                    data={[{ title: "+1" }]}
                                    onValueChange={(index, title) => {
                                    }}
                                />
                            </View>
                            <CustomTextInput
                                onChangeText={setPhone}
                                keyboardType={"numeric"}
                                placeholder="Phone Number"
                                style={{ marginLeft: "3%", width: "79%", }}
                                value={phone}
                            />
                        </View>
                        <View>
                            <Text style={{ fontFamily: 'ABRe', fontSize: 14, color: '#FCFCFC', marginTop: 10 }}>Password</Text>
                            <CustomTextInput
                                onChangeText={setPassword}
                                placeholder="Password"
                                // style={{ marginTop: 15, }}
                                secureTextEntry={showPass}
                                value={password}

                            />
                        </View>




                        {/* <Text style={{ fontFamily: 'ABRe', fontSize: 14, color: '#FCFCFC', marginTop: 10 }}>Full Name</Text>
                        <CustomTextInput
                            placeholder={""}
                        />
                        <Text style={{ fontFamily: 'ABRe', fontSize: 14, color: '#FCFCFC', marginTop: 10 }}>Email</Text>
                        <CustomTextInput
                            placeholder={""}
                        />
                        <Text style={{ fontFamily: 'ABRe', fontSize: 14, color: '#FCFCFC', marginTop: 10 }}>Phone Number</Text>
                        <CustomTextInput
                            placeholder={""}
                        /> */}

                    </View>


                </ScrollView>
            </SafeAreaView>
            <MainButton
                btnStyle={{ position: 'absolute', bottom: 40, width: "90%", alignSelf: 'center' }}
                text={userId && username == selectUserObj.username ? "Next" : "Add"}
                onPress={() => {
                    if (userId && username == selectUserObj.username) {
                        const myObj = {
                            username: username,
                            profile_pic: profilePic,
                            email: email,
                            phone: phone,
                            id: userId
                        }
                        navigate('NewAppoint', myObj)
                        doConsole(myObj)

                    }
                    else doNext();
                }}
            />
        </View>
    )
}

export default AddNewClient
