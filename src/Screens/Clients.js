import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, TextInput, Alert } from 'react-native'
import { goBack, navigate } from '../../Navigations';

import { acolors } from '../Components/AppColors';
import CustomTextInput from '../Components/CustomTextInput';
import PrivacyPicker from '../Components/PrivacyPicker';
import { MainButton } from '../Components/Buttons';
import { ArrowForward, ArrowRight, ChatSendIcon, GroupIcon, NotificationIcon, SearchIcon } from '../Components/Svgs';
import { Entypo } from '@expo/vector-icons';

import { useFocusEffect } from '@react-navigation/native';
import { apiRequest } from '../utils/apiCalls';
import { retrieveItem, useForceUpdate, doConsole, storeItem } from '../utils/functions';
import Loader from '../utils/Loader';
import DropdownAlert from 'react-native-dropdownalert';

var alertRef;



const Clients = () => {


    const [tabs, setTabs] = useState('list');
    const [clients, setSalClients] = useState([]);
    const [tempClients, setTempClients] = useState([])
    const [searchKeyWord, setSearchKeyword] = useState('');
    const [salGroups, setSalGroups] = useState([]);

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
    function get_sal_groups(date) {
        setLoading(true)
        retrieveItem('login_data')
            .then(data => {
                apiRequest({ token: data.token }, 'get_sal_groups')
                    .then(data1 => {
                        setLoading(false)
                        if (data1.action == 'success') {
                            setSalGroups(data1.data)
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


    useFocusEffect(React.useCallback(() => {
        get_sal_clients()
        get_sal_groups()
    }, []))





    const Header = () => (
        <View style={{ width: "100%", flexDirection: 'row', justifyContent: 'space-between' }} >
            <TouchableOpacity
                onPress={() => navigate('Notifications')}
            >
                <NotificationIcon />
            </TouchableOpacity>
            <Text style={{ fontFamily: 'ABRe', fontSize: 20.67, color: 'white' }}>Clients</Text>
            <TouchableOpacity
                onPress={() => navigate('Chats')}
            >
                <ChatSendIcon />
            </TouchableOpacity>
        </View>
    )



    const TabView = () => (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 20, width: "100%", alignSelf: 'center' }}>
            <TouchableOpacity
                onPress={() => {
                    setTabs('list')
                }}
                style={[tabs == 'list' ? styles.activeTab : styles.inActiveTab, { borderTopLeftRadius: 8, borderBottomLeftRadius: 8 }]} >
                <Text style={tabs == 'list' ? styles.activeTabText : styles.inActiveTabText}>List({clients?.length})</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    setTabs('group')
                }}
                style={[tabs == 'group' ? styles.activeTab : styles.inActiveTab, { borderTopRightRadius: 8, borderBottomRightRadius: 8 }]} >
                <Text style={tabs == 'group' ? styles.activeTabText : styles.inActiveTabText}>Groups({salGroups?.length})</Text>
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
                <TabView />
                {/* {
                    tabs == 'list' &&

                    <View style={{ width: "100%", height: 42, borderWidth: 1, borderColor: 'white', borderRadius: 8, paddingHorizontal: 10, alignItems: 'center', flexDirection: 'row', marginTop: 20 }}>
                        <TouchableOpacity>
                            <SearchIcon />
                        </TouchableOpacity>
                        <TextInput
                            placeholder='Search Clients'
                            placeholderTextColor="rgba(252, 252, 252, 1)"
                            returnKeyLabel='Search'
                            enablesReturnKeyAutomatically={true}
                            // onChangeText={(v) => searchClient(v)}
                            // onSubmitEditing={() => {
                            //     navigate('SearchScreen')
                            // }}
                            style={{ marginLeft: 10, color: 'rgba(252, 252, 252, 1)', fontFamily: 'ABRe', flex: 1 }}
                        />
                    </View>
                } */}
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
                                    onPress={() => navigate('ClientProfile', v)} style={{ flexDirection: 'row', marginTop: 15, width: "100%" }}>
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
                    {
                        tabs == 'group' &&
                        salGroups?.map((v, i) => {
                            return (
                                <TouchableOpacity
                                    onPress={() => {
                                        Alert.alert('Under construction')
                                        // navigate('Chats')
                                    }}
                                    key={i} style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15, width: "100%", paddingBottom: 20, borderBottomWidth: 1, borderColor: 'rgba(255, 255, 255, 0.1)' }}>
                                    {
                                        v.g_pic ? <Image
                                            style={{ width: 36, height: 36, borderRadius: 36 / 2 }}
                                            source={{ uri: v.g_pic }}
                                        />
                                            : <GroupIcon />
                                    }

                                    <View style={{ marginLeft: 15 }}>
                                        <Text style={{ fontFamily: "ABRe", fontSize: 12.89, color: 'white', lineHeight: 21, }}>{v.g_name}</Text>
                                        {/* <Text style={{ fontFamily: "ABRe", fontSize: 12.89, color: 'rgba(255,255,255,0.6)', lineHeight: 21, }}>Clients registered in the last 30 days</Text> */}
                                    </View>
                                    <ArrowForward style={{ position: 'absolute', right: 0, top: 12 }} />
                                </TouchableOpacity>
                            )
                        })
                    }
                </ScrollView>




            </SafeAreaView>
            <TouchableOpacity
                onPress={() => {
                    if (tabs == 'group') {
                        navigate('MakeGroup', clients)
                    }
                    else navigate('AddNewClient')
                }}
                style={{ width: 58, height: 58, borderRadius: 58 / 2, backgroundColor: 'black', alignItems: 'center', justifyContent: 'center', position: 'absolute', right: 20, bottom: 20 }}>
                <Entypo name='plus' size={30} color={"white"} />
            </TouchableOpacity>
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



export default Clients

