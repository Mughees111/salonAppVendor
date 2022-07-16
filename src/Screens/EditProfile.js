import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Dimensions } from 'react-native'
import { goBack, navigate } from '../../Navigations';
import { ArrowDown, ArrowLeft, ArrowRight, FbIcon, GoogleIcon, PlusCircle } from '../Components/Svgs';
import { acolors } from '../Components/AppColors';
import CustomTextInput from '../Components/CustomTextInput';
import PrivacyPicker from '../Components/PrivacyPicker';
import { MainButton } from '../Components/Buttons';
import { OnBoardingHeader } from '../Components/Header';

import ReactNativeModal from 'react-native-modal';
import { Title, Body, Button, Header, Left, Radio, Right } from 'native-base';


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
        sal_country: params?.sal_country ? params?.sal_country : '',
        sal_city: params?.sal_city ? params?.sal_city : '',
        sal_phone: params?.sal_phone ? params?.sal_phone : '',
        lincense_id: params?.lincense_id ? params?.lincense_id : '',
        sal_email: params?.sal_email ? params?.sal_email : '',
        selectedCat: params?.categories ?? []
    })

    const [catData, setCatData] = useState([]);
    // const [selectedCat, setSelectedCat] = useState([]);
    const [selectCatModal, setSelectCatModal] = useState(false);



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

                var catIds = [];
                for (let key of editProfileData.selectedCat) {
                    catIds.push(key?.id);
                }

                var reqObj = {
                    sal_name: editProfileData.sal_name,
                    sal_contact_person: editProfileData.sal_contact_person,
                    sal_address: editProfileData.sal_address,
                    sal_description: editProfileData.sal_description,
                    lincense_id: editProfileData.lincense_id,
                    sal_country: editProfileData.sal_country,
                    sal_city: editProfileData.sal_city,
                    sal_phone: editProfileData.sal_phone,
                    categories: catIds,
                    token: data1.token

                }

                if (editProfileData.sal_email !== params?.sal_email) {
                    reqObj.sal_email = editProfileData.sal_email;
                }

                console.log(reqObj);
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

    function getCategories() {
        setLoading(true);
        apiRequest({ token: '' }, 'get_categories_v')
            .then(data => {
                setLoading(false);
                if (data.action == 'success') {

                    setCatData(data.data)
                }
                else alertRef.alertWithType('error', 'Error', data.error);


            })
            .catch(err => {
                setLoading(false);
            })

    }

    function addCategoryToArray(v) {

        let data = editProfileData.selectedCat;
        let arr = data;
        // console.log(data)
        console.log('len', data.length)
        if (data.length == 0) {
            console.log('000')
            arr = [];
            arr.push(v);
        }
        for (let key in data) {
            console.log(key)
            if (data[key].id == v.id) {
                arr.splice(key, 1);
            }
            else {
                if ((parseInt(key) + 1) == data.length) {
                    arr.push(v);
                }
            }
        }
        console.log('arr== ', arr);
        setEditProfileData({
            ...editProfileData,
            selectedCat: arr
        });
        // setSelectedCat(arr);
        forceUpdate();

        // console.log('params?.categories', typeof params?.categories, params?.categories);
        // // let arr = editProfileData.selectedCat;
        // if (Object.keys(arr).includes(v)) {
        //     console.log('includes');
        //     let foundIndex = arr.indexOf(v);
        //     arr.splice(foundIndex, 1);
        // }
        // else {
        //     console.log('not includes');
        //     arr.push(v);
        // }
      

    }

    function checkExist(v) {
        let data = editProfileData.selectedCat;
        for (let key in data) {
            if (data[key].id == v.id) {
                return true
            }
            else {
                if ((parseInt(key) + 1) == data.length) {
                    return false
                }
            }
        }
    }

    useEffect(() => {
        getCategories();
        console.log(editProfileData.selectedCat)
        if (!props?.route?.params?.sal_id) {
            goBack();
        }
    }, [])


    const headerPicker = () => {
        return (
            <Header style={{ backgroundColor: acolors.bgColor }}>
                <Left>
                    <Button
                        style={{
                            shadowOffset: null,
                            shadowColor: null,
                            shadowRadius: null,
                            shadowOpacity: null,
                            marginLeft: 3,
                        }}
                        transparent
                        onPress={() => {
                            setSelectCatModal(false)
                        }}
                    >
                        <Text style={{ color: '#fff' }}>Close</Text>
                    </Button>
                </Left>
                {/* <Body>
                    <Text style={{ color: "white", fontSize: 20, }}>Choose</Text>
                </Body> */}
                <Right>
                    <Button
                        style={{
                            shadowOffset: null,
                            shadowColor: null,
                            shadowRadius: null,
                            shadowOpacity: null,
                            marginLeft: 3,
                        }}
                        transparent
                        onPress={() => {
                            setSelectCatModal(false)
                        }}
                    >
                        <Text style={{ color: '#fff' }}>Done</Text>
                    </Button>
                </Right>

            </Header>
        )
    }


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
                <ScrollView contentContainerStyle={{ paddingBottom: 100 }} >

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

                    <Text style={{ fontFamily: 'ABRe', fontSize: 16, color: acolors.white, marginTop: 25 }}>Email</Text>
                    <CustomTextInput
                        value={editProfileData.sal_email}
                        placeholder={"Email"}
                        onChangeText={(v) => {
                            setEditProfileData({
                                ...editProfileData,
                                sal_email: v
                            })
                        }}
                        style={{ marginTop: 10 }}
                    />


                    <Text style={{ fontFamily: 'ABRe', fontSize: 16, color: acolors.white, marginTop: 25 }}>Phone No</Text>
                    <CustomTextInput
                        value={editProfileData.sal_phone}
                        placeholder={"Phone"}
                        onChangeText={(v) => {
                            setEditProfileData({
                                ...editProfileData,
                                sal_phone: v
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
                    <Text style={{ fontFamily: 'ABRe', fontSize: 16, color: acolors.white, marginTop: 25 }}>Country</Text>
                    <CustomTextInput
                        placeholder={"Country"}
                        value={editProfileData.sal_country}
                        onChangeText={(v) => {
                            setEditProfileData({
                                ...editProfileData,
                                sal_country: v
                            })
                        }}
                        style={{ marginTop: 10 }}

                    />
                    <Text style={{ fontFamily: 'ABRe', fontSize: 16, color: acolors.white, marginTop: 25 }}>City</Text>
                    <CustomTextInput
                        placeholder={"City"}
                        value={editProfileData.sal_city}
                        onChangeText={(v) => {
                            setEditProfileData({
                                ...editProfileData,
                                sal_city: v
                            })
                        }}
                        style={{ marginTop: 10 }}

                    />
                    <Text style={{ fontFamily: 'ABRe', fontSize: 16, color: acolors.white, marginTop: 25 }}>Category</Text>
                    <TouchableOpacity
                        onPress={() => setSelectCatModal(true)}
                        style={{ width: "100%", height: 42, marginTop: 15, borderWidth: 1, borderColor: '#FCFCFC', borderRadius: 8, alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: 10 }}>
                        {!editProfileData.selectedCat.length ? <Text style={{ color: acolors.white, fontSize: 14, fontFamily: "ABRe" }}>Salon Category</Text>
                            :
                            <View style={{ flexDirection: 'row', marginLeft: -2 }}>
                                {editProfileData.selectedCat.map((v, i) => {
                                    return (
                                        <Text style={{ color: acolors.white, fontSize: 14, fontFamily: "ABRe", marginLeft: 2 }}>{v.title}, </Text>
                                    )
                                })
                                }
                            </View>
                        }
                        <ArrowDown />
                    </TouchableOpacity>


                    <Text style={{ fontFamily: 'ABRe', fontSize: 16, color: acolors.white, marginTop: 25 }}>Lincense id</Text>
                    <CustomTextInput
                        value={editProfileData.lincense_id}
                        onChangeText={(v) => {
                            setEditProfileData({
                                ...editProfileData,
                                lincense_id: v
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

                    <TouchableOpacity
                        onPress={() => navigate('DelAccount')}
                        style={{ alignSelf: 'center', marginTop: 20 }}>
                        <Text style={{ fontFamily: 'ABRe', fontSize: 14, color: 'red' }}>Delete Account</Text>
                    </TouchableOpacity>


                </ScrollView>

            </SafeAreaView>

            <ReactNativeModal
                isVisible={selectCatModal}
                style={{ margin: 0, marginTop: 20 }}

            >
                {headerPicker()}
                <View style={{ width: "100%", height: "100%", backgroundColor: 'white', paddingHorizontal: 20, paddingTop: 20 }}>
                    {
                        catData?.map((v, i) => {
                            return (
                                <TouchableOpacity
                                    key={v?.id}
                                    onPress={() => addCategoryToArray(v)}
                                    style={{ flexDirection: 'row', justifyContent: 'space-between', width: "100%", marginTop: 15, paddingBottom: 10, borderBottomWidth: 0.5, borderColor: 'grey' }}
                                >

                                    <Text style={{ color: '#363636', fontSize: 20, fontFamily: "ABRe" }}>
                                        {v?.title}
                                    </Text>

                                    {
                                        checkExist(v) ? (
                                            <Radio selected={true} />
                                        ) : (
                                            <Radio selected={false} />
                                        )
                                    }


                                </TouchableOpacity>
                            )
                        })
                    }




                </View>

            </ReactNativeModal>


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




