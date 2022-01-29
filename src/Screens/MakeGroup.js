import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, TextInput } from 'react-native'
import { goBack, navigate } from '../../Navigations';

import { acolors } from '../Components/AppColors';
import CustomTextInput from '../Components/CustomTextInput';
import PrivacyPicker from '../Components/PrivacyPicker';
import { MainButton } from '../Components/Buttons';
import { ArrowForward, ArrowLeft, ArrowRight, CameraIcon, CameraIcon2, ChatSendIcon, GroupIcon, NotificationIcon, SearchIcon } from '../Components/Svgs';
import { Entypo, AntDesign } from '@expo/vector-icons';

import { useFocusEffect } from '@react-navigation/native';
import { apiRequest } from '../utils/apiCalls';
import { retrieveItem, useForceUpdate, doConsole, storeItem, update_dp } from '../utils/functions';
import Loader from '../utils/Loader';
import DropdownAlert from 'react-native-dropdownalert';



var alertRef;



const MakeGroup = (props) => {


    const [tabs, setTabs] = useState('list');
    const [clients, setSalClients] = useState(props.route.params);
    const [tempClients, setTempClients] = useState([])
    const [searchKeyWord, setSearchKeyword] = useState('');
    const [selectedGroupMembers, setSelectedGroupMembers] = useState([]);
    const [step, setStep] = useState(1);

    const [gPicToShow, setGPicToShow] = useState('');
    const [gPic, setGPic] = useState('');
    const [gName, setGName] = useState('');
    const forceUpdate = useForceUpdate();
    // const { state } = useContext(Context);
    const [loading, setLoading] = useState(false);

    function get_sal_clients(date) {
        setLoading(true)
        retrieveItem('login_data')
            .then(data => {
                apiRequest({ token: data.token }, 'get_sal_clients')
                    .then(data1 => {
                        setLoading(false)
                        if (data1.action == 'success') {

                            setSalClients(data1.data)
                            setTempClients(data1.data)
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

    function gallaryUpload() {

        var x = alertRef;
        setLoading(true)
        retrieveItem('login_data')
            .then(data => {

                update_dp(1, data.token, "public_image")
                    .then(data => {
                        setLoading(false)
                        if (data.action == "success") {
                            console.log('asd')
                            setLoading(false)
                            setGPic(data.filename);
                            setGPicToShow(data.url)
                        }
                        else {
                            setLoading(false)
                            x.alertWithType('error', 'Error', data.error);
                        }
                    })
                    .catch((error) => {
                        setLoading(false)
                        x.alertWithType('error', 'error', "Internet Error");
                        // setLoading(false)
                    })
            })
    }

    function createGroup() {
        if (gName == '') {
            alertRef.alertWithType("error", "Error", "Please provide group subject");
            return;
        }
        if (!selectedGroupMembers.length) {
            alertRef.alertWithType("error", "Error", "Please provide group members");
            return;
        }

        setLoading(true)
        retrieveItem('login_data')
            .then(data => {
                var userIds = '';
                for (let key in selectedGroupMembers) {
                    userIds += selectedGroupMembers[key].id + ','
                }
                userIds = userIds.substr(0, userIds.length - 1)
                const reqObj = {
                    token: data.token,
                    user_ids: userIds,
                    g_name: gName,
                    g_pic: gPic
                }
                doConsole(reqObj)

                apiRequest(reqObj, 'make_group')
                    .then(data1 => {
                        setLoading(false)
                        if (data1.action == 'success') {
                            alertRef.alertWithType("success", "Success", "Group has been created successfully");
                            setTimeout(() => {
                                navigate('Clients');
                            }, 800);
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

    useFocusEffect(React.useCallback(() => {
        // get_sal_clients()
    }, []))

    function addMember(clientData) {
        let arr = selectedGroupMembers;
        if (arr.includes(clientData)) {
            var foundIndex = arr.indexOf(clientData);
            arr.splice(foundIndex, 1);
            setSelectedGroupMembers(arr)
            forceUpdate();
        }
        else {
            arr.push(clientData);
            setSelectedGroupMembers(arr)
            forceUpdate();
        }
    }




    const Header = () => (
        <View style={{ width: "100%", flexDirection: 'row', justifyContent: 'space-between' }} >
            <TouchableOpacity
                onPress={() => {
                    if (step == 1) {
                        goBack()
                    }
                    else {
                        setStep('1')
                    }

                }}
            >
                <ArrowLeft />
            </TouchableOpacity>
            <Text style={{ fontFamily: 'ABRe', fontSize: 20.67, color: 'white' }}>{step == 1 ? "Select Clients" : "Group Details"} </Text>
            <TouchableOpacity
            // onPress={() => navigate('Chats')}
            >
                {/* <ChatSendIcon /> */}
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

            {loading && <Loader />}
            <DropdownAlert ref={(ref) => alertRef = ref} />

            <SafeAreaView style={{ marginTop: 10, width: "90%", alignSelf: 'center' }}>
                <Header />
                {
                    step == 1 &&
                    <> 
                        <View style={{ flexDirection: 'row', marginTop: 10, width: 40 }}>
                            {
                                selectedGroupMembers?.map((v, i) => {
                                    return (
                                        <View
                                            key={i}
                                            style={{ marginLeft: i == 0 ? 0 : 10 }}>
                                            <View>
                                                <Image
                                                    style={{ width: 50, height: 50, borderRadius: 50 / 2 }}
                                                    source={{ uri: v.profile_pic }}
                                                />
                                                {/* <TouchableOpacity
                                            onPress={() => {
                                                // addMember(v)
                                            }}
                                            style={{ position: 'absolute', bottom: 0, right: 0, width: 20, height: 20, borderRadius: 10, backgroundColor: 'black', alignItems: 'center', justifyContent: 'center' }}>
                                            <AntDesign style={{ alignSelf: 'center' }} name='close' size={14} color={"white"} />
                                        </TouchableOpacity> */}

                                            </View>
                                            <Text numberOfLines={1} style={{ fontFamily: 'ABRe',alignSelf:'center', fontSize: 12, color: acolors.white }}>{v.username}</Text>
                                        </View>
                                    )

                                })
                            }



                        </View>

                        <ScrollView
                            // bounces={true}
                            contentContainerStyle={{ paddingBottom: 100 }}
                            style={{ marginTop: 10 }}>
                            {
                                tabs == 'list' &&
                                clients?.map((v, i) => {
                                    return (
                                        <TouchableOpacity
                                            key={i}
                                            onPress={() => {
                                                addMember(v)
                                            }}
                                            style={{ flexDirection: 'row', marginTop: 15, width: "100%" }}>
                                            <Image
                                                style={{ width: 49, height: 49, borderRadius: 49 / 2 }}
                                                source={{ uri: v.profile_pic }
                                                    // require('../assets/img1.png')
                                                }
                                            />
                                            <View style={{ marginLeft: 15 }}>
                                                <Text style={{ fontFamily: "ABRe", fontSize: 12.89, color: 'white', lineHeight: 21, }}>{v.name}</Text>
                                                <Text style={{ fontFamily: "ABRe", fontSize: 12.89, color: 'white', lineHeight: 21 }}>{v.email}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                })

                            }


                        </ScrollView>
                    </>
                }

                {
                    step == 2 &&
                    <View style={{ marginTop: 20 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity
                                onPress={() => {
                                    gallaryUpload()
                                }}
                                style={{ width: 50, height: 50, justifyContent: 'center', borderRadius: 50 / 2, backgroundColor: 'rgba(255,255,255,1)', alignItems: 'center' }}>
                                {gPicToShow ?
                                    <Image
                                        style={{ width: 50, height: 50, borderRadius: 25, }}
                                        source={{ uri: gPicToShow }}
                                    /> :
                                    <CameraIcon color={'black'} />
                                }
                            </TouchableOpacity>
                            <CustomTextInput
                                onChangeText={setGName}
                                placeholder={"Type group subject here..."}
                                style={{ width: "80%", marginTop: 0, height: 50, marginLeft: 10, borderTopWidth: 0, borderRightWidth: 0, borderLeftWidth: 0 }}
                            />
                        </View>
                        <Text style={{ fontFamily: 'ABRe', fontSize: 15, color: acolors.white, marginTop: 20 }}>Provide a group subject and optional group icon</Text>
                        <View style={{ marginTop: 20, }}>
                            <Text style={{ fontFamily: 'ABRe', fontWeight: 'bold', fontSize: 15, color: acolors.white }}>Clients</Text>
                            <ScrollView contentContainerStyle={{ paddingBottom: 200 }} >
                                {
                                    selectedGroupMembers?.map((v, i) => {
                                        return (
                                            <TouchableOpacity
                                                key={i}
                                                onPress={() => {
                                                    addMember(v)
                                                }}
                                                style={{ flexDirection: 'row', marginTop: 15, width: "100%" }}>
                                                <Image
                                                    style={{ width: 49, height: 49, borderRadius: 49 / 2 }}
                                                    source={{ uri: v.profile_pic }
                                                        // require('../assets/img1.png')
                                                    }
                                                />
                                                <View style={{ marginLeft: 15 }}>
                                                    <Text style={{ fontFamily: "ABRe", fontSize: 12.89, color: 'white', lineHeight: 21, }}>{v.name}</Text>
                                                    <Text style={{ fontFamily: "ABRe", fontSize: 12.89, color: 'white', lineHeight: 21 }}>{v.email}</Text>
                                                </View>
                                            </TouchableOpacity>
                                        )
                                    })

                                }
                            </ScrollView>
                        </View>
                    </View>
                }

            </SafeAreaView>
            <MainButton
                btnStyle={{ position: 'absolute', bottom: 40, width: "90%", alignSelf: 'center' }}
                text={step == 1 ?"Next":"Create"}
                onPress={() => {
                    if (step == 1) {
                        setStep(2)
                        forceUpdate();
                    }
                    else {
                        createGroup()
                    }
                }}
            />
            {/* <TouchableOpacity
                onPress={() => {
                    if (tabs == 'group') {
                        navigate('MakeGroup', clients)
                    }
                    else navigate('AddNewClient')
                }}
                style={{ width: 58, height: 58, borderRadius: 58 / 2, backgroundColor: 'black', alignItems: 'center', justifyContent: 'center', position: 'absolute', right: 20, bottom: 20 }}>
                <Entypo name='plus' size={30} color={"white"} />
            </TouchableOpacity> */}
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



export default MakeGroup

