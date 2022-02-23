import React, { useCallback, useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
import { Text, View, StyleSheet, TouchableOpacity, Image, SafeAreaView, FlatList, ScrollView, Dimensions, Alert, RefreshControl } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import { goBack, navigate } from '../../Navigations';
import { acolors } from '../Components/AppColors';
import { ArrowLeft, RattingStarIcon, HeartIcon, MsgIcon, PhoneIcon, SettingsIcon, PencilIcon, CameraIcon2 } from '../Components/Svgs';
import Reviews from '../Components/Reviews';
import { MainButton } from '../Components/Buttons';

import { useFocusEffect } from '@react-navigation/native';
import { apiRequest } from '../utils/apiCalls';
import { retrieveItem, useForceUpdate, doConsole, update_dp, update_dp_2, storeItem } from '../utils/functions';
import Loader from '../utils/Loader';
import DropdownAlert from 'react-native-dropdownalert';
// import { Context } from '../Context/DataContext';

var alertRef;


const SalonProfile = () => {

    const forceUpdate = useForceUpdate();
    // const { state, setUserGlobal } = useContext(Context);
    const [imgsUrlForUpload, setImgsUrlForUpload] = useState();
    const [imgsUrlToShow, setImgsUrlToShow] = useState();

    const [imgsUrlForUploadP, setImgsUrlForUploadP] = useState();
    const [imgsUrlToShowP, setImgsUrlToShowP] = useState();

    const [imgsToShowSal, setImgsToShowSal] = useState([]);
    const [imgsToUploadSal, setImgsToUploadSal] = useState([]);

    const [loading, setLoading] = useState(false)
    const [userData, setUserData] = useState()

    const [salData, setSalData] = useState([]);

    const [editImgs, setEditImgs] = useState(false);

    const keyExtractor = ((item, index) => index.toString())
    const images = [
        require('../assets/SalonDetailImg.png'),
        require('../assets/SalonDetailImg.png'),
        require('../assets/SalonDetailImg.png'),
    ];

    const daysArr = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
    ]

    function get_sal_profile() {
        retrieveItem('login_data')
            .then(data => {
                const reqObj = {
                    token: data.token
                }
                apiRequest(reqObj, 'get_sal_profile')
                    .then(data => {
                        setRefreshing(false)
                        if (data.action == 'success') {
                            setSalData(data.data)
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


    function cameraUplaodP() {
        var x = alertRef;
        setLoading(true)
        update_dp_2(1, userData.token, "public_image")
            .then(data => {
                setLoading(false)
                console.log('data2 = ')
                console.log(data)
                if (data.action == "success") {
                    console.log('asd')
                    setLoading(false)
                    setImgsUrlForUploadP(data.filename);
                    setImgsUrlToShowP(data.url)
                    forceUpdate();


                }
                else {
                    setLoading(false)
                    x.alertWithType('error', 'Error', data.error);
                }
            })
            .catch((error) => {
                console.log(error)
                setLoading(false)
                // x.alertWithType('error', 'error', "Internet Error");
                // setLoading(false)
            })
    }

    function gallaryUploadP() {

        var x = alertRef;
        setLoading(true)
        update_dp(1, userData.token, "public_image")
            .then(data => {
                setLoading(false)
                console.log('data2 = ')
                console.log(data)

                if (data.action == "success") {
                    console.log('asd')
                    setLoading(false)
                    setImgsUrlForUploadP(data.filename);
                    setImgsUrlToShowP(data.url)
                    forceUpdate();
                    setTimeout(() => {
                        forceUpdate();
                        updateProfile();
                    }, 500);
                }
                else {
                    setLoading(false)
                    x.alertWithType('error', 'Error', data.error);
                }
            })
            .catch((error) => {
                setLoading(false)
                // x.alertWithType('error', 'error', "Internet Error");
                // setLoading(false)
            })
    }


    function cameraUplaod() {
        update_dp_2(1, userData.token, "public_image")
            .then(data => {
                setLoading(false)
                console.log('data2 = ')
                console.log(data)

                if (data.action == "success") {
                    console.log('asd')
                    setLoading(false)
                    setImgsUrlForUpload(data.filename);
                    setImgsUrlToShow(data.url)
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
    }

    function gallaryUpload() {

        var x = alertRef;
        setLoading(true)
        update_dp(1, userData.token, "public_image")
            .then(data => {
                setLoading(false)
                console.log('data2 = ')
                console.log(data)

                if (data.action == "success") {
                    console.log('asd')
                    setLoading(false)
                    setImgsUrlForUpload(data.filename);
                    setImgsUrlToShow(data.url)
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
    }



    function cameraUplaodSalPhotos() {
        update_dp_2(1, userData.token, "public_image")
            .then(data => {
                setLoading(false)
                if (data.action == "success") {

                    let arr1 = imgsToShowSal;
                    let arr2 = imgsToUploadSal;

                    arr1.push(data.url);
                    arr2.push(data.filename);

                    setImgsToShowSal(arr1);
                    setImgsToUploadSal(arr2);

                    forceUpdate();

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
    }

    function gallaryUploadSalPhotos() {

        var x = alertRef;
        setLoading(true)
        update_dp(1, userData.token, "public_image")
            .then(data => {
                setLoading(false)
                console.log('data2 = ')
                console.log(data)

                if (data.action == "success") {
                    let arr1 = imgsToShowSal;
                    let arr2 = imgsToUploadSal;

                    arr1.push(data.url);
                    arr2.push(data.filename);

                    setImgsToShowSal(arr1);
                    setImgsToUploadSal(arr2);

                    forceUpdate();

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
    }

    function updateProfile() {
        retrieveItem('login_data')
            .then(data1 => {
                const reqObj = {
                    sal_profile_pic: imgsUrlForUploadP ? imgsUrlForUploadP : null,
                    sal_pic: imgsUrlForUpload ? imgsUrlForUpload : null,
                    token: data1.token,

                }
                setLoading(true)
                apiRequest(reqObj, 'update_salon')
                    .then(data => {
                        setLoading(false);
                        if (data.action == 'success') {

                            alertRef.alertWithType("success", "Success");
                            console.log(data);
                            storeItem('login_data', data.data);
                            setSalData(data.data);
                            // clean up states
                            setImgsUrlForUpload('')
                            setImgsUrlToShow('')
                            setImgsUrlForUploadP('')
                            setImgsUrlToShowP('')

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


    function add_sal_imgs() {
        retrieveItem('login_data')
            .then(data1 => {
                const reqObj = {
                    imgs: imgsToUploadSal,
                    token: data1.token,

                }
                setLoading(true)
                apiRequest(reqObj, 'add_sal_imgs')
                    .then(data => {
                        setLoading(false);
                        if (data.action == 'success') {

                            alertRef.alertWithType("success", "Success");
                            console.log(data);
                            storeItem('login_data', data.data);
                            setSalData(data.data);
                            // clean up states
                            setImgsToShowSal([])
                            setImgsToUploadSal([]);

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


    function del_salon_imgs(id) {
        retrieveItem('login_data')
            .then(data => {
                const reqObj = {
                    token: data.token,
                    id: id
                }
                setLoading(true)
                apiRequest(reqObj, 'del_salon_imgs')
                    .then(data => {
                        setLoading(false)
                        if (data.action == 'success') {
                            setSalData(data.data)
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

    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        get_sal_profile()
        // wait(2000).then(() => setRefreshing(false));
    }, []);


    useEffect(() => {
        // get_sal_profile()
    }, [])

    useFocusEffect(React.useCallback(
        () => {
            retrieveItem('login_data')
                .then(data => {
                    setUserData(data)
                    setSalData(data)
                    forceUpdate();
                })
        },
        [],
    ))

    const MakeReview = ({ number }) => {
        console.log(number)
        var stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                // <View>
                <RattingStarIcon width={16} height={15} color={i > number ? "grey" : null} />
                // </View>
            )
        }
        return <View style={{ flexDirection: 'row' }}>{stars}</View>

    }


    return (
        <View style={{ flex: 1, backgroundColor: acolors.bgColor }}>
            {loading && <Loader />}
            <DropdownAlert ref={(ref) => alertRef = ref} />

            <StatusBar
                style='light'
                backgroundColor={acolors.bgColor}
                translucent={false}
            />

            {/* <Image
                source={require('../assets/SalonDetailMask.png')}
                style={{ position: 'absolute', height: 200, resizeMode: 'stretch', top: 0, width: "100%" }}
            /> */}

            <View>
                <Image
                    style={{ width: "100%", height: 200, resizeMode: 'cover' }}
                    source={{ uri: imgsUrlToShow ? imgsUrlToShow : salData?.sal_pic }
                        // require('../assets/SalonDetailImg.png')
                    }
                />
                <TouchableOpacity
                    onPress={() => {
                        {
                            imgsUrlForUpload ?
                                updateProfile() :

                                Alert.alert(
                                    "Upload Picture",
                                    'How do you want to upload picture?',

                                    [
                                        { text: 'Camera', onPress: () => cameraUplaod() },

                                        { text: 'Gallery', onPress: () => gallaryUpload() },
                                    ],
                                    { cancelable: true },
                                );
                        }
                    }}
                    style={{ paddingHorizontal: 15, position: 'absolute', bottom: 50, right: 10, height: 23, alignItems: 'center', justifyContent: 'center', backgroundColor: acolors.primary, borderRadius: 6 }}>
                    <Text style={{ fontFamily: 'ABRe', fontSize: 10.82, color: '#111111' }}>{imgsUrlForUpload ? "Update" : "Change Cover"}</Text>

                </TouchableOpacity>
            </View>


            <SafeAreaView style={{ position: 'absolute', top: 0, }}>
                <View style={{ paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', width: Dimensions.get('window').width, }}>
                    <TouchableOpacity
                        onPress={() => goBack()}
                        style={{ width: 34, height: 34, borderRadius: 34 / 2, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' }}>
                        <ArrowLeft />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigate('SettingsScreen')}
                        style={{}}>
                        <SettingsIcon width={30} height={30} />
                    </TouchableOpacity>

                </View>
            </SafeAreaView>



            <SafeAreaView style={{ marginTop: 22, backgroundColor: '#111111', marginTop: 0, borderTopLeftRadius: 30 }}>

                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                    contentContainerStyle={{ paddingBottom: 300 }}>

                    <View style={{ flexDirection: 'row', flex: 1, paddingRight: 10 }}>
                        <View style={{ width: "25%", marginLeft: 20, }}>
                            <Image
                                style={{ width: "100%", height: "100%", resizeMode: 'cover', borderRadius: 10 }}
                                source={{ uri: imgsUrlToShowP ? imgsUrlToShowP : salData?.sal_profile_pic }
                                    // require('../assets/salonProfileImg1.png',)
                                }
                            />
                            {
                                !imgsUrlToShowP ?
                                    <TouchableOpacity
                                        onPress={() => {

                                            Alert.alert(
                                                "Upload Picture",
                                                'How do you want to upload picture?',

                                                [
                                                    { text: 'Camera', onPress: () => cameraUplaodP() },

                                                    { text: 'Gallery', onPress: () => gallaryUploadP() },
                                                ],
                                                { cancelable: true },
                                            );

                                        }}

                                        style={{ position: 'absolute', bottom: -6, right: -6, width: 22, height: 22, borderRadius: 11, backgroundColor: acolors.white, alignItems: 'center', justifyContent: 'center' }}>

                                        <CameraIcon2 />
                                    </TouchableOpacity>
                                    :
                                    <View style={{ position: 'absolute', bottom: 0, backgroundColor: 'rgba(0,0,0,0.7)', width: "100%", height: 25, flexDirection: 'row' }}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                setImgsUrlForUploadP('');
                                                setImgsUrlToShowP('');
                                            }}
                                            style={{ width: "50%", alignItems: 'center', justifyContent: 'center', height: 25 }}>
                                            <Text style={{ color: 'white', fontFamily: 'ABRe', fontSize: 12, }}>Cancel</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => {
                                                forceUpdate();
                                                updateProfile();
                                            }}
                                            style={{ width: "50%", alignItems: 'center', justifyContent: 'center', height: 25, borderLeftWidth: 0.5, borderColor: 'white' }}>
                                            <Text style={{ color: 'white', fontFamily: 'ABRe', fontSize: 12 }}>Done</Text>
                                        </TouchableOpacity>
                                    </View>
                            }
                        </View>
                        <View style={{ marginLeft: 15, marginTop: 7, flex: 1 }}>

                            <Text style={{ fontFamily: 'ABRe', fontSize: 17, color: acolors.primary, lineHeight: 25 }}>{salData?.sal_name}</Text>
                            <Text style={{ fontFamily: 'ABRe', fontSize: 14, color: '#FFFFFF', lineHeight: 15 }}>{salData?.sal_contact_person}
                                <Text style={{ color: 'rgba(255,255,255,0.5)' }}> (Owner)</Text>
                            </Text>
                            <Text style={{ fontFamily: 'ABRe', fontSize: 14, color: 'rgba(255,255,255,0.8)', marginTop: 3, }}>{salData?.sal_address}</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
                                <Text style={{ fontFamily: 'ABRe', fontSize: 12, color: '#FFFFFF' }}>4.5</Text>
                                <RattingStarIcon />
                                {/* <View style={{ width: 5, height: 5, borderRadius: 2.5, backgroundColor: 'white', marginLeft: 10 }}></View> */}
                                {/* <Text style={{ fontFamily: 'ABRe', fontSize: 12, color: '#FFFFFF', marginLeft: 5 }}>5.5 Km</Text> */}
                            </View>

                            <TouchableOpacity
                                onPress={() => {
                                    // Alert.alert('asd')
                                    navigate('EditProfile', salData);
                                }}
                                style={{ position: 'absolute', top: 2, right: 5, width: 33, marginLeft: 10, height: 33, borderRadius: 33 / 2, backgroundColor: acolors.primary, alignItems: 'center', justifyContent: 'center' }}>
                                <PencilIcon width={17} height={17} color="black" />
                            </TouchableOpacity>

                        </View>
                    </View>


                    <View style={{ paddingHorizontal: 20, marginTop: 15, }}>
                        {/* Description */}
                        {/* <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}> */}
                        <Text style={styles.headingText}>Description</Text>
                        {/* <TouchableOpacity style={{ padding: 5, }}>
                                <Text style={styles.editText}>Edit</Text>
                            </TouchableOpacity> */}
                        {/* </View> */}
                        <Text style={[styles.simpleText, { lineHeight: 20 }]}>{salData?.sal_description}</Text>
                        {/* Tax Id */}
                        <TouchableOpacity style={{ padding: 5, alignSelf: 'flex-end' }}>
                            <Text style={styles.editText}>Edit</Text>
                        </TouchableOpacity>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text style={styles.headingText}>Tax ID</Text>
                            <Text style={[styles.headingText, { fontSize: 14 }]}>75654</Text>
                        </View>
                        {/* Opening Hours */}
                        <View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 20 }}>
                                <Text style={[styles.headingText]}>Opening Hours</Text>
                                <TouchableOpacity
                                    onPress={() => {
                                        navigate('EditHours', salData)
                                    }}
                                    style={{ padding: 5, alignSelf: 'flex-end' }}>
                                    <Text style={styles.editText}>Edit</Text>
                                </TouchableOpacity>
                            </View>

                            {
                                salData?.sal_hours?.map((v, i) => {
                                    return (
                                        <View
                                            key={i}
                                            style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5, paddingBottom: 5, paddingHorizontal: 2, borderBottomWidth: 1, borderColor: 'rgba(255,255,255,0.2)' }}>
                                            <Text style={styles.simpleText}>{daysArr[i]}</Text>
                                            <View style={{}}>
                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                    <View style={{ width: 5, height: 5, borderRadius: 2.5, backgroundColor: acolors.primary }}></View>
                                                    <Text style={[styles.simpleText, { marginLeft: 20 }]}>{v[0] ? v[0] : null} {v[0] != 'closed' && v[1]?.length ? "-" + v[1] : null} </Text>
                                                </View>
                                            </View>
                                        </View>
                                    )
                                })
                            }
                            {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                                <Text style={styles.simpleText}>Monday - Friday</Text>
                                <View style={{}}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <View style={{ width: 5, height: 5, borderRadius: 2.5, backgroundColor: acolors.primary }}></View>
                                        <Text style={[styles.simpleText, { marginLeft: 20 }]}>7:30 - 11:30 AM</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                                        <View style={{ width: 5, height: 5, borderRadius: 2.5, backgroundColor: acolors.primary }}></View>
                                        <Text style={[styles.simpleText, { marginLeft: 20 }]}>7:30 - 11:30 AM</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                                        <View style={{ width: 5, height: 5, borderRadius: 2.5, backgroundColor: acolors.primary }}></View>
                                        <Text style={[styles.simpleText, { marginLeft: 20 }]}>7:30 - 11:30 AM</Text>
                                    </View>
                                </View>
                            </View> */}
                        </View>

                        {/* Services */}
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 20 }}>
                            <Text style={[styles.headingText]}>Service List</Text>
                            <TouchableOpacity
                                onPress={() => {
                                    navigate('EditServices')
                                }}
                                style={{ padding: 5, alignSelf: 'flex-end' }}>
                                <Text style={styles.editText}>Edit</Text>
                            </TouchableOpacity>
                        </View>
                        {
                            salData?.sal_services?.map((v, i) => {
                                return (
                                    <View
                                        key={i}
                                        style={{ marginTop: 10, flexDirection: 'row', width: "100%", justifyContent: 'space-between', alignItems: 'center', }}>
                                        <View style={{ width: "50%" }}>
                                            <Text style={{ color: '#FCFCFC', fontSize: 15, fontFamily: 'ABRe' }}>{v.s_name}</Text>
                                            <Text style={{ color: 'rgba(255,255,255,0.6)', fontSize: 15, fontFamily: 'ABRe' }}>{v.s_time_mins} mins</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Text style={{ fontFamily: 'ABRe', fontSize: 15, color: '#FCFCFC', }}>${v.s_price}</Text>
                                        </View>
                                    </View>
                                )
                            })
                        }


                        {/* Location */}

                        <View style={{ marginTop: 20 }}>
                            <Image
                                style={{ width: "100%", resizeMode: 'stretch', }}
                                source={require('../assets/map.png')}
                            />
                            <TouchableOpacity style={{ position: 'absolute', top: 0, right: 0, padding: 15 }}>
                                <Text style={{ fontFamily: 'ABRe', fontSize: 12, color: acolors.primary, }}>Change</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Photos */}
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 20 }}>
                            <Text style={styles.headingText}>Photos</Text>
                            <TouchableOpacity

                                onPress={() => {
                                    if (editImgs) {
                                        Alert.alert(
                                            "Upload Picture",
                                            'How do you want to upload picture?',

                                            [
                                                { text: 'Camera', onPress: () => cameraUplaodSalPhotos() },

                                                { text: 'Gallery', onPress: () => gallaryUploadSalPhotos() },
                                            ],
                                            { cancelable: true },
                                        );
                                    }
                                    else {
                                        setEditImgs(!editImgs)
                                    }


                                }}

                                style={{ padding: 5, alignSelf: 'flex-end' }}>
                                <Text style={styles.editText}>{editImgs ? "+ Add Photos" : "Edit"} </Text>
                            </TouchableOpacity>
                        </View>



                        <FlatList
                            style={{ marginTop: 10 }}
                            keyExtractor={keyExtractor}
                            showsVerticalScrollIndicator={false}
                            horizontal={true}
                            data={imgsToShowSal[0] ? imgsToShowSal : salData?.sal_imgs}
                            renderItem={({ item }) => (
                                <View

                                >
                                    <Image
                                        style={{ width: 79, height: 69, borderRadius: 5, marginLeft: 10, borderRadius: 8 }}
                                        source={{ uri: item.img ? item.img : item ? item : "http" }}
                                    />
                                    {
                                        editImgs && item.id &&

                                        <TouchableOpacity
                                            onPress={() => {
                                                del_salon_imgs(item.id)
                                            }}
                                            style={{ position: 'absolute', bottom: 0, width: 79, alignSelf: 'center', left: 10, height: 20, backgroundColor: 'rgba(0,0,0,0.7)', alignItems: 'center', justifyContent: 'center' }}>
                                            <Text style={{ fontWeight: 'bold', fontSize: 12, color: 'red', alignSelf: 'center' }}>Remove</Text>
                                        </TouchableOpacity>
                                    }
                                </View>
                            )}
                        />
                        {
                            editImgs &&

                            <TouchableOpacity
                                onPress={() => {
                                    setEditImgs(false)
                                }}
                                style={{ alignSelf: 'flex-end', padding: 10 }}>
                                <Text style={[styles.editText, { margin: 0 }]}>Done</Text>
                            </TouchableOpacity>
                        }
                        {
                            imgsToShowSal[0] && editImgs &&

                            <MainButton
                                text={"Upload"}
                                btnStyle={{ width: "25%", marginTop: 20, alignSelf: 'center', height: 35 }}
                                onPress={() => {
                                    add_sal_imgs()
                                }}
                            />
                        }

                        {/* Reviews */}

                        <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center' }}>
                            <Text style={{ fontSize: 17, fontFamily: 'ABRe', color: 'white', }}>Reviews ({salData?.sal_reviews?.length})</Text>
                            {
                                salData?.sal_reviews?.length > 0 &&
                                <View style={{ position: 'absolute', right: 0, }}>
                                    <MakeReview width={20} number={salData?.sal_ratings} />
                                </View>
                            }
                        </View>
                        {/* <Text style={{ marginTop: 20, fontSize: 17, fontFamily: 'ABRe', color: 'white', }}>Reviews ({salData?.sal_reviews?.length})</Text> */}
                        {
                            salData?.sal_reviews?.length > 0 &&
                            <>
                                {
                                    salData?.sal_reviews?.map((v, i) => {
                                        if (i > 3) {
                                            return null
                                        }

                                        return (
                                            <View key={i}>
                                                <Reviews
                                                    key={i}
                                                    name={v.username}
                                                    image={v.profile_pic}
                                                    review={v.rev_text}
                                                    rattings={v.rev_rating}
                                                    rev_datetime={v.rev_datetime}
                                                />
                                            </View>
                                        )
                                    })
                                }
                                <TouchableOpacity
                                    onPress={() => {
                                        console.log('pressed')
                                        navigate('AllReviews', salData?.sal_reviews)
                                    }}
                                >
                                    <Text style={{ color: acolors.primary, fontFamily: 'ABRe', fontSize: 12, marginTop: 15 }}>View all reviews</Text>
                                </TouchableOpacity>
                            </>
                        }


                        {/* <Text style={{ marginTop: 20, fontSize: 17, fontFamily: 'ABRe', color: 'white' }}>Reviews</Text> */}
                        {/* <View>
                            <Reviews
                                name="William David:"
                                image={require("../assets/reviewImg1.png")}
                                review="Lorem ipsum dolor sit , consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut"
                                rattings="5.0"
                            />
                            <Reviews
                                name="Richard Thomas"
                                image={require("../assets/reviewImg1.png")}
                                review="Lorem ipsum dolor sit , consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut"
                                rattings="4.5"
                            />
                            <Reviews
                                name="Xquenda Cuauhtémoc"
                                image={require("../assets/reviewImg1.png")}
                                review="Lorem ipsum dolor sit , consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut"
                                rattings="4.8"
                                last={true}
                            />
                            <TouchableOpacity
                                onPress={() => {
                                    console.log('pressed')
                                    navigate('AllReviews')
                                }}
                            >
                                <Text style={{ color: acolors.primary, fontFamily: 'ABRe', fontSize: 12, }}>View all reviews</Text>
                            </TouchableOpacity>
                        </View> */}

                        {/* <MainButton
                            btnStyle={{ marginTop: 15 }}
                            onPress={() => navigate('BookAppointment')}
                            text="Save"

                        /> */}
                    </View>
                </ScrollView>
            </SafeAreaView>

        </View >
    )
}

const styles = StyleSheet.create({
    headingText: {
        marginTop: 5,
        fontSize: 17,
        fontFamily: 'ABRe',
        color: 'white'
    },

    simpleText: {
        fontSize: 14,
        fontFamily: 'ABRe',
        color: 'rgba(255,255,255,0.8)',

    },
    editText: {
        fontFamily: 'ABRe',
        fontSize: 12,
        color: '#E2B378',

    }
})

export default SalonProfile

// [
                                //     { img: require('../assets/salonImg1.png') },
                                //     { img: require('../assets/salonImg3.png') },
                                //     { img: require('../assets/salonImg2.png') },
                                //     { img: require('../assets/salonImg1.png') },
                                //     { img: require('../assets/salonImg2.png') },
                                //     { img: require('../assets/salonImg3.png') },
                                // ]